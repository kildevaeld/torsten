package fs

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/kildevaeld/torsten"
)

type FileSystemOptions struct {
	Path string
}

type fs_impl struct {
	path string
}

func (self *fs_impl) Set(key string, reader io.Reader, options torsten.CreateOptions) error {

	fp := filepath.Join(self.path, key)

	dir := filepath.Dir(fp)
	if dir != self.path {
		if err := os.MkdirAll(dir, 0755); err != nil {
			fmt.Printf("error %s\n", err)
			return err
		}
	}

	file, err := os.Create(fp)
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = io.Copy(file, reader)

	return err

}

func (self *fs_impl) Get(key string) (io.ReadCloser, error) {
	fp := filepath.Join(self.path, key)
	return os.Open(fp)
}

func (self *fs_impl) Remove(key string) error {
	return nil
}

func New(options FileSystemOptions) (torsten.DataAdator, error) {
	var err error
	var stat os.FileInfo

	path := options.Path

	if !filepath.IsAbs(path) {

		cwd, err := os.Getwd()
		if err != nil {
			return nil, err
		}

		path = filepath.Join(cwd, path)
	}

	stat, err = os.Stat(options.Path)
	if err != nil {
		if err = os.MkdirAll(path, 0766); err != nil {
			return nil, err
		}
	}

	if stat != nil && !stat.IsDir() {
		return nil, fmt.Errorf("path '%s' exists, but is not a directory", options.Path)
	}

	fs := &fs_impl{path}

	return fs, nil
}
