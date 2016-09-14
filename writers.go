package torsten

import (
	"bytes"
	"crypto/sha1"
	"fmt"
	"io"
	"io/ioutil"
	"os"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten/mime"
)

type writer struct {
	path    string
	info    *FileInfo
	buf     *writereader
	hash    *HashWriter
	torsten *torsten
	err     error
}

func (self *writer) Write(bs []byte) (int, error) {
	if self.err != nil {
		return 0, self.err
	}
	return self.buf.Write(bs)
}

func (self *writer) init() error {
	go func() {
		err := self.torsten.data.Set([]byte(self.path), self.buf, &filestore.SetOptions{
			MimeType: self.info.Mime,
			Size:     self.info.Size,
		})
		self.err = err
	}()

	return nil
}

func (self *writer) Close() error {
	if self.err != nil {
		return self.err
	}
	err := self.buf.Close()
	if err != nil {
		return err
	}

	self.info.Sha1 = self.hash.Sum(self.info.Sha1)

	return self.torsten.meta.Finalize(self.path, self.info)

}

func newWriter(t *torsten, path string, info *FileInfo) *writer {

	buf := newWriteReader()
	return &writer{
		path:    path,
		torsten: t,
		info:    info,
		buf:     buf,
		hash:    NewHashWriter(buf, sha1.New()),
	}
}

type size_writer struct {
	path    string
	info    *FileInfo
	tmpFile *os.File
	hash    *HashWriter
	torsten *torsten
	err     error
	size    int64
}

func (self *size_writer) Write(bs []byte) (int, error) {
	if self.err != nil {
		return 0, self.err
	}
	i, err := self.tmpFile.Write(bs)
	self.size += int64(i)
	return i, err
}

func (self *size_writer) init() error {

	file, err := ioutil.TempFile("", "")
	if err != nil {
		return err
	}

	self.tmpFile = file
	self.hash = NewHashWriter(file, sha1.New())

	return nil
}

func (self *size_writer) Close() error {
	defer self.tmpFile.Close()
	if self.err != nil {
		return self.err
	}

	if _, err := self.tmpFile.Seek(0, 0); err != nil {
		return err
	}

	self.info.Sha1 = self.hash.Sum(self.info.Sha1)
	self.info.Size = self.size

	if err := self.torsten.data.Set([]byte(self.path), self.tmpFile, &filestore.SetOptions{
		MimeType: self.info.Mime,
		Size:     self.info.Size,
	}); err != nil {
		return err
	}

	return self.torsten.meta.Finalize(self.path, self.info)

}

func newSizeWriter(t *torsten, path string, info *FileInfo) *size_writer {

	return &size_writer{
		path:    path,
		torsten: t,
		info:    info,
	}
}

var octetStream = "application/octet-stream"

type mime_writer struct {
	buf    *bytes.Buffer
	writer io.WriteCloser
	info   *FileInfo
}

func (self *mime_writer) getMimeType() string {
	if self.buf == nil {
		if self.info.Mime != "" {
			return self.info.Mime
		}
		return octetStream
	}

	m, e := mime.DetectContentType(self.buf.Bytes())

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
	var i int
	var e error
	if self.buf != nil {
		i, e = self.buf.Write(bs)
		if self.buf.Len() >= 16 {
			self.info.Mime = self.getMimeType()
			i, e = self.writer.Write(self.buf.Bytes())
			self.buf = nil
		}
	} else {
		i, e = self.writer.Write(bs)
	}

	return i, e
}

func (self *mime_writer) Close() error {
	if self.buf != nil && self.buf.Len() > 0 {
		self.writer.Write(self.buf.Bytes())
		self.info.Mime = self.getMimeType()
		fmt.Printf("%#v", self.info)
	}

	return self.writer.Close()
}

func newMimeWriter(writer io.WriteCloser, info *FileInfo) io.WriteCloser {
	return &mime_writer{
		buf:    bytes.NewBuffer(nil),
		writer: writer,
		info:   info,
	}
}

type hook_writer struct {
	writer  io.WriteCloser
	torsten *torsten
	info    *FileInfo
}

func (self *hook_writer) Write(bs []byte) (int, error) {
	return self.writer.Write(bs)
}

func (self *hook_writer) Close() error {
	err := self.writer.Close()
	if err != nil {
		return err
	}

	return self.torsten.runHook(PostCreate, self.info)
}
