package torsten

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/satori/go.uuid"
)

type MetaMap map[string]interface{}

// Scan implements the Scanner interface.
func (nt *MetaMap) Scan(value interface{}) error {
	var err error
	switch t := value.(type) {
	case string:
		err = json.Unmarshal([]byte(t), nt)
	case []byte:
		err = json.Unmarshal(t, nt)
	}
	return err
}

// Value implements the driver Valuer interface.
func (nt MetaMap) Value() (driver.Value, error) {
	b, e := json.Marshal(nt)
	if e != nil {
		return nil, e
	}
	return string(b), nil
}

func (mm MetaMap) Has(key string) bool {
	if _, ok := mm[key]; ok {
		return true
	}
	return false
}

var ErrNotFound = errors.New("Not Found")
var ErrAlreadyExists = errors.New("Already Exists")
var ErrForbidden = errors.New("Forbidden")

type HookFunc func(Hook, string, *FileInfo) error
type CreateHookFunc func(*FileInfo, WriteCloser) (WriteCloser, error)
type FileStatus int

const (
	Creating FileStatus = iota + 1
	Removing
	Updating
	Active
)

type FileInfo struct {
	Id     uuid.UUID   `json:"id,omitempty"`
	Name   string      `json:"name"`
	Size   int64       `json:"size,omitempty"`
	Mode   os.FileMode `json:"mode,omitempty"`
	Gid    uuid.UUID   `json:"gid,omitempty"`
	Uid    uuid.UUID   `json:"uid,omitempty"`
	Mime   string      `json:"mime,omitempty"`
	Status FileStatus  `json:"status,omitempty"`
	Sha1   []byte      `json:"sha1,omitempty"`
	Meta   MetaMap     `json:"meta,omitempty"`
	Ctime  time.Time   `json:"ctime,omitempty"`
	Mtime  time.Time   `json:"mtime,omitempty"`
	IsDir  bool        `json:"is_dir"`
	Path   string      `json:"path"`
	Hidden bool        `json:"hidden"`
}

func (self *FileInfo) FullPath() string {
	return filepath.Join(self.Path, self.Name)
}

type FileNode struct {
	Path  string
	IsDir bool
	File  *FileInfo
}

type CreateOptions struct {
	Overwrite bool
	Mode      os.FileMode
	Gid       uuid.UUID
	Uid       uuid.UUID
	Mime      string
	Size      int64
	Meta      map[string]interface{}
}

type GetOptions struct {
	Gid []uuid.UUID
	Uid uuid.UUID
}

type RemoveOptions struct {
	Gid []uuid.UUID
	Uid uuid.UUID
}

type ListOptions struct {
	Limit     int64
	Offset    int64
	Recursive bool
	Gid       []uuid.UUID
	Uid       uuid.UUID
	Hidden    bool
}

type DataAdator interface {
	Set(key string, reader io.Reader, size int64, mime string) error
	Get(key string) (io.ReadCloser, error)
	Remove(key string) error
}

type MetaAdaptor interface {
	Insert(path string, info *FileInfo) error
	Update(path string, info *FileInfo) error
	GetById(id uuid.UUID, info *FileInfo) error
	Get(path string, options GetOptions) (*FileInfo, error)
	List(prefix string, options ListOptions, fn func(path string, node *FileInfo) error) error
	Remove(path string, options RemoveOptions) error
	Count(path string, options GetOptions) (int64, error)
}

type Torsten interface {
	Create(path string, opts CreateOptions) (WriteCloser, error)
	Copy(from, to string) error
	Move(from, to string) error
	MkDir(path string) error

	Remove(path string, o RemoveOptions) error
	RemoveAll(path string, o RemoveOptions) error
	/// Open by path, id or FileInfo
	Open(path interface{}, options GetOptions) (io.ReadCloser, error)
	Stat(path interface{}, options GetOptions) (*FileInfo, error)
	List(prefix string, options ListOptions, fn func(path string, node *FileInfo) error) error

	Count(path string, options GetOptions) (int64, error)
	RegisterHook(hook Hook, fn HookFunc)
	RegisterCreateHook(fn CreateHookFunc)
	EscapePath(path string) (string,error)
}

type WriteCloser interface {
	Path() string
	//FileInfo() FileInfo
	io.WriteCloser
}
