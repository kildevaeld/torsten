package torsten

import (
	"bytes"
	"errors"
	"fmt"
	"image/png"
	"io"
	"io/ioutil"
	"path/filepath"

	"github.com/Sirupsen/logrus"
	"github.com/nfnt/resize"
	uuid "github.com/satori/go.uuid"
)

type ThumbnailFunc func(r io.Reader) (io.ReadCloser, CreateOptions, error)

var _generators map[string]ThumbnailFunc

type Thumbnailer struct {
	torsten Torsten
}

func init() {
	_generators = make(map[string]ThumbnailFunc)

	_generators["image/png"] = func(r io.Reader) (io.ReadCloser, CreateOptions, error) {
		img, err := png.Decode(r)
		o := CreateOptions{}
		if err != nil {
			return nil, o, err
		}
		img = resize.Thumbnail(64, 64, img, resize.Lanczos3)

		buf := bytes.NewBuffer(nil)

		if err := png.Encode(buf, img); err != nil {
			buf.Reset()
			return nil, o, err
		}

		reader := ioutil.NopCloser(bytes.NewReader(buf.Bytes()))
		o.Size = int64(buf.Len())
		o.Mime = "image/png"

		return reader, o, nil
	}
}

func (self *Thumbnailer) Has(path string) bool {

	return false
}

func (self *Thumbnailer) generate(path string, info *FileInfo) error {
	var (
		reader io.ReadCloser
		err    error
		writer io.WriteCloser
	)

	if !self.can(info) {
		return errors.New("cannot")
	}

	gen := _generators[info.Mime]

	reader, err = self.torsten.Open(path, GetOptions{
		Uid: info.Uid,
		Gid: []uuid.UUID{info.Gid},
	})

	if err != nil {
		return fmt.Errorf("Open: %s", err)
	}

	defer reader.Close()

	r, o, e := gen(reader)
	if e != nil {
		return fmt.Errorf("Generator: %s", e)
	}
	defer r.Close()

	dir := filepath.Join(filepath.Dir(path), ".thumbnails")
	path = filepath.Join(dir, info.Name)
	o.Uid = info.Uid
	o.Gid = info.Gid
	o.Mode = info.Mode
	o.Meta = MetaMap{
		"thumbnail": info.Id,
	}
	logrus.Printf("Create thumbanil %s, size: %d, type : %s", path, o.Size, o.Mime)
	if writer, err = self.torsten.Create(path, o); err != nil {
		return fmt.Errorf("Create: %s", err)
	}

	//fmt.Printf("%#v", writer)
	if _, err = io.Copy(writer, reader); err != nil {
		writer.Close()
		return fmt.Errorf("Copy: %s", err)
	}
	err = writer.Close()
	if err != nil {
		return fmt.Errorf("Close: %s, %#v", err, writer)
	}
	return nil
}

func (self *Thumbnailer) can(info *FileInfo) bool {
	if _, ok := _generators[info.Mime]; ok {
		return true
	}
	return false
}

func (self *Thumbnailer) onPostCreate() {
	self.torsten.RegisterHook(PostCreate, func(hook Hook, path string, info *FileInfo) error {

		if _, ok := info.Meta["thumbnail"]; ok {
			return nil
		}
		err := self.generate(path, &(*info))
		if err != nil {
			fmt.Printf("ERROR %s\n", err)
		}
		return nil
	})
}
