package torsten

import (
	"io"

	"github.com/satori/go.uuid"
)

type torsten struct {
	data DataAdator
	meta MetaAdaptor
}

func (self *torsten) Create(path string, opts CreateOptions) (io.WriteCloser, error) {
	if _, e := self.Stat(path); e == nil {

	}
	size := opts.Size
	mime := opts.Mime
	if opts.Size == 0 {
		// Get size

		return nil, nil
	}

	u := uuid.NewV4()

	info := FileInfo{
		Id:   u,
		Size: size,
		Mime: mime,
		Gid:  opts.Gid,
		Uid:  opts.Uid,
		Mode: opts.Mode,
	}

	if err := self.meta.Set(path, &info, Creating); err != nil {
		return nil, err
	}

	writer := newWriter(self, path, &info)

	return writer, nil
}
func (self *torsten) Copy(from, to string) error {
	return nil
}
func (self *torsten) Move(from, to string) error {
	return nil
}
func (self *torsten) MkDir(path string) error {
	return nil
}

func (self *torsten) Remove(path string) error {
	return nil
}
func (self *torsten) RemoveAll(path string) error {
	return nil
}

func (self *torsten) Open(path string) (io.ReadCloser, error) {
	return nil, nil
}
func (self *torsten) Stat(path string) (FileInfo, error) {
	return FileInfo{}, nil
}
