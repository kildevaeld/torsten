package torsten

import (
	"io"
	"os"
	"time"

	"github.com/satori/go.uuid"
)

type Hook int

const (
	PreCreate Hook = iota + 1
	PostCreate
	PreRemove
	PostRemove
)

type HookFunc func(Hook, *FileInfo) error

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
	Sha1   []byte
	Meta   map[string]interface{}
	Ctime  time.Time
	Mtime  time.Time
}

type FileNode struct {
	Path  string
	IsDir bool
	File  *FileInfo
}

type CreateOptions struct {
	Overwrite bool
	Mode      os.FileMode
	Gid       int
	Uid       int
	Mime      string
	Size      int64
	Meta      map[string]interface{}
}

type DataAdator interface {
	Set(key string, reader io.Reader, size int64, mime string) error
	Get(key string) (io.ReadCloser, error)
	Remove(key string) error
}

type MetaAdaptor interface {
	Prepare(path string) error
	Finalize(path string, info *FileInfo) error
	Update(path string, info *FileInfo) error
	Get(path string) (FileInfo, error)
	List(path string, fn func(info *FileNode) error) error
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
	List(prefix string, fn func(node *FileNode) error) error

	RegisterHook(hook Hook, fn HookFunc)
}
