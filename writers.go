package torsten

import (
	"bytes"
	"crypto/sha1"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"sync"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten/mime"
)

/// A Buffered ReadWriter
type writereader struct {
	buffer    []byte
	lock      sync.Mutex
	closed    bool
	cond      *sync.Cond
	readReady bool
}

func (self *writereader) Write(bs []byte) (int, error) {
	self.lock.Lock()
	self.buffer = append(self.buffer, bs...)
	self.lock.Unlock()

	self.cond.L.Lock()
	self.readReady = true
	self.cond.L.Unlock()
	self.cond.Signal()

	return len(bs), nil
}

func (self *writereader) Read(bs []byte) (int, error) {
	l := len(bs)

	if l == 0 {
		return 0, errors.New("")
	}

	if self.Length() > 0 {
		return self.read(bs)
	}

	self.cond.L.Lock()
	for !self.closed && !self.readReady {
		self.cond.Wait()
	}
	var err error
	if self.readReady {
		self.cond.L.Unlock()
		return self.read(bs)
	} else if self.closed {
		err = io.EOF
	}

	self.cond.L.Unlock()

	return 0, err
}

func (self *writereader) read(bs []byte) (n int, err error) {
	self.lock.Lock()
	defer self.lock.Unlock()

	n = copy(bs, self.buffer[0:])
	self.buffer = self.buffer[n:]

	if len(self.buffer) == 0 {
		self.cond.L.Lock()
		self.readReady = false
		self.cond.L.Unlock()
		self.cond.Broadcast()
	}

	return n, nil
}

func (self *writereader) Length() int {
	self.lock.Lock()
	defer self.lock.Unlock()
	return len(self.buffer)
}

func (self *writereader) CloseWriter() error {
	self.cond.L.Lock()
	self.closed = true
	self.cond.L.Unlock()
	self.cond.Broadcast()
	return nil
}

func (self *writereader) Close() error {
	self.CloseWriter()

	self.cond.L.Lock()
	for self.readReady {
		self.cond.Wait()
	}
	self.cond.L.Unlock()

	return nil
}

func NewWriteReader() io.ReadWriteCloser {
	c := sync.NewCond(&sync.Mutex{})
	return &writereader{cond: c}
}

func newWriteReader() *writereader {
	c := sync.NewCond(&sync.Mutex{})
	return &writereader{cond: c}
}

type writer struct {
	path    string
	info    *FileInfo
	buf     *writereader
	hash    *HashWriter
	torsten *torsten
	err     error
	is_init bool
	done    func(error) error
	wDone   chan struct{}
}

func (self *writer) Write(bs []byte) (int, error) {
	self.init()
	if self.err != nil {
		return 0, self.err
	}

	return self.hash.Write(bs)
}

func (self *writer) init() error {
	if self.is_init {
		return nil
	}

	go func() {

		err := self.torsten.data.Set([]byte(self.path), self.buf, &filestore.SetOptions{
			MimeType: self.info.Mime,
			Size:     self.info.Size,
		})
		self.err = err
		self.wDone <- struct{}{}
	}()
	self.is_init = true
	return nil
}

func (self *writer) Close() error {
	self.init()
	if self.err != nil {
		return self.err
	}
	err := self.buf.Close()
	if err != nil {
		return err
	}

	self.info.Sha1 = self.hash.Sum(self.info.Sha1)

	<-self.wDone
	close(self.wDone)
	if self.err != nil {
		return self.err
	}

	return self.done(self.err)

	//return self.torsten.meta.Finalize(self.path, self.info)

}

func (self *writer) Path() string {
	return self.path
}


func newWriter(t *torsten, path string, info *FileInfo, done func(error) error) *writer {

	buf := newWriteReader()
	return &writer{
		path:    path,
		torsten: t,
		info:    info,
		buf:     buf,
		hash:    NewHashWriter(buf, sha1.New()),
		wDone:   make(chan struct{}),
		done:    done,
	}
}

type size_writer struct {
	info    *FileInfo
	tmpFile *os.File
	//hash    *HashWriter
	//torsten *torsten
	writer  WriteCloser
	err     error
	size    int64
	is_init bool
}

func (self *size_writer) Write(bs []byte) (int, error) {

	if err := self.init(); err != nil {
		return -1, err
	}

	i, err := self.tmpFile.Write(bs)
	self.size += int64(i)
	return i, err
}

func (self *size_writer) init() error {
	if self.is_init {
		return nil
	}
	file, err := ioutil.TempFile("", "")
	if err != nil {
		return err
	}

	self.tmpFile = file
	self.is_init = true
	return nil
}

func (self *size_writer) Close() error {
	if err := self.init(); err != nil {
		return err
	}
	defer os.Remove(self.tmpFile.Name())
	defer self.tmpFile.Close()

	if self.err != nil {
		return self.err
	}

	if _, err := self.tmpFile.Seek(0, 0); err != nil {
		return err
	}
	self.info.Size = self.size
	i, err := io.Copy(self.writer, self.tmpFile)
	if err != nil {
		return err
	}
	if int64(i) != self.info.Size {
		return fmt.Errorf("size %d != %d", self.info.Size, i)
	}

	return self.writer.Close()

}

func (self *size_writer) Path() string {
	return self.writer.Path()
}

func newSizeWriter(writer WriteCloser, info *FileInfo) *size_writer {

	return &size_writer{
		writer: writer,
		//torsten: t,
		info: info,
	}
}

var octetStream = "application/octet-stream"

type mime_writer struct {
	buf    *bytes.Buffer
	writer WriteCloser
	info   *FileInfo
	tried  bool
}

func (self *mime_writer) getMimeType(bs []byte) string {

	m, e := mime.DetectContentType(bs)

	if e != nil {
		return octetStream
	} else if m == octetStream {
		m, e = mime.DetectContentTypeFromPath(self.info.Name)
	}
	if m == "" {
		m = octetStream
	}

	return m
}

func (self *mime_writer) Write(bs []byte) (int, error) {

	if !self.tried && (self.info.Mime == octetStream || self.info.Mime == "") {
		self.info.Mime = self.getMimeType(bs)
		self.tried = true
	}

	return self.writer.Write(bs)
}

func (self *mime_writer) Close() error {

	return self.writer.Close()
}

func (self *mime_writer) Path() string {
	return self.writer.Path()
}


func newMimeWriter(writer WriteCloser, info *FileInfo) WriteCloser {
	return &mime_writer{
		buf:    bytes.NewBuffer(nil),
		writer: writer,
		info:   info,
	}
}
