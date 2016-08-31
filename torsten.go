package torsten

import (
	"io"
	"os"

	"github.com/satori/go.uuid"
)

type FileStatus int

const (
	Creating FileStatus = iota + 1
	Removing
	Updating
	Active
)

type FileInfo struct {
	Id     uuid.UUID
	Name   string
	Size   int64
	Mode   os.FileMode
	Gid    int
	Uid    int
	Mime   string
	Status FileStatus
	sha1   []byte
}

type CreateOptions struct {
	Overwrite bool
	Mode      os.FileMode
	Gid       int
	Uid       int
	Mime      string
	Size      int64
}

type DataAdator interface {
	Set(key string, reader io.Reader, options CreateOptions) error
	Get(key string) (io.ReadCloser, error)
	Remove(key string) error
}

type MetaAdaptor interface {
	UpdateStatus(path string, status FileStatus) error
	Set(path string, info *FileInfo, status FileStatus) error
	Get(id string) (*FileInfo, error)
	List(path string, fn func(info *FileInfo) error) error
	Remove(path string) error
}

type Torsten interface {
	Create(path string, opts CreateOptions) (io.WriteCloser, error)
	Copy(from, to string) error
	Move(from, to string) error
	MkDir(path string) error

	Remove(path string) error
	RemoveAll(path string) error

	Open(path string) (io.ReadCloser, error)
	Stat(path string) (FileInfo, error)
}
