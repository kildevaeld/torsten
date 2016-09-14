package torsten

import (
	"errors"
	"io"
	"path/filepath"
	"sync"

	"github.com/kildevaeld/filestore"
	uuid "github.com/satori/go.uuid"
)

type torsten struct {
	data  filestore.Store
	meta  MetaAdaptor
	hooks map[Hook][]HookFunc
	lock  sync.RWMutex
}

func (self *torsten) Create(path string, opts CreateOptions) (io.WriteCloser, error) {
	var e error
	if _, e = self.Stat(path); e == nil && opts.Overwrite == false {
		return nil, errors.New("file already exists")
	} else if e == nil {
		if e = self.Remove(path); e != nil {
			return nil, e
		}
	}

	name := filepath.Base(path)

	info := &FileInfo{
		Id:   uuid.NewV4(),
		Size: opts.Size,
		Mime: opts.Mime,
		Gid:  opts.Gid,
		Uid:  opts.Uid,
		Mode: opts.Mode,
		Name: name,
	}

	if err := self.runHook(PreCreate, info); err != nil {
		return nil, err
	}

	if err := self.meta.Prepare(path); err != nil {
		return nil, err
	}

	var writer io.WriteCloser

	if opts.Size == 0 {
		w := newSizeWriter(self, path, info)
		if err := w.init(); err != nil {
			return nil, err
		}
		writer = w
	} else {
		w := newWriter(self, path, info)
		if err := w.init(); err != nil {
			return nil, err
		}
		writer = w
	}

	if info.Mime == "" {
		writer = newMimeWriter(writer, info)
	}

	writer = &hook_writer{writer, self, info}

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
	_, err := self.Stat(path)
	if err != nil {
		return err
	}

	if err = self.meta.Remove(path); err != nil {
		return err
	}

	if err = self.data.Remove([]byte(path)); err != nil {
		return err
	}

	return nil

}
func (self *torsten) RemoveAll(path string) error {
	return nil
}

func (self *torsten) Open(path string) (io.ReadCloser, error) {
	if _, err := self.Stat(path); err != nil {
		return nil, err
	}
	return self.data.Get([]byte(path))
}
func (self *torsten) Stat(path string) (FileInfo, error) {
	return self.meta.Get(path)
}

func (self *torsten) List(prefix string, fn func(node *FileNode) error) error {
	return self.meta.List(prefix, fn)
}

func (self *torsten) RegisterHook(hook Hook, fn HookFunc) {
	self.lock.Lock()
	defer self.lock.Unlock()

	var hooks []HookFunc
	var ok bool
	if hooks, ok = self.hooks[hook]; ok {
		hooks = append(hooks, fn)
	} else {
		hooks = []HookFunc{fn}
	}

	self.hooks[hook] = hooks
}

func (self *torsten) runHook(hook Hook, info *FileInfo) error {
	self.lock.RLock()
	defer self.lock.RUnlock()

	if hooks, ok := self.hooks[hook]; ok {
		for _, h := range hooks {
			if err := h(hook, info); err != nil {
				return err
			}
		}
	}

	return nil

}

func New(f filestore.Store, m MetaAdaptor) Torsten {
	return &torsten{data: f, meta: m, hooks: make(map[Hook][]HookFunc)}
}
