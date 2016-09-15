package torsten

import (
	"errors"
	"fmt"
	"io"
	"path/filepath"
	"sync"

	"github.com/Sirupsen/logrus"
	"github.com/kildevaeld/filestore"
	uuid "github.com/satori/go.uuid"
)

type torsten struct {
	data        filestore.Store
	meta        MetaAdaptor
	hooks       map[Hook][]HookFunc
	createHooks []CreateHookFunc
	lock        sync.RWMutex
	states      StateLock
}

func (self *torsten) Create(path string, opts CreateOptions) (io.WriteCloser, error) {
	var e error
	if _, e = self.Stat(path, GetOptions{opts.Uid, opts.Gid}); e == nil && opts.Overwrite == false {
		return nil, errors.New("file already exists")
	} else if e == nil {
		if e = self.Remove(path, RemoveOptions{opts.Uid, opts.Gid}); e != nil {
			return nil, fmt.Errorf("remove: %s", e)
		}
	}

	name := filepath.Base(path)
	/*dir := filepath.Dir(dir)
	if dir == "." || dir == "" {
		dir = "/"
	} else if dir[0] != '/' {
		dir = "/" + dir
	}*/
	info := &FileInfo{
		Id:   uuid.NewV4(),
		Size: opts.Size,
		Mime: opts.Mime,
		Gid:  opts.Gid,
		Uid:  opts.Uid,
		Mode: opts.Mode,
		Name: name,
		//Path: dir,
	}

	lock, err := self.states.Acquire(StateCreate, path)
	if err != nil {
		return nil, err
	}

	if err := self.runHook(PreCreate, info); err != nil {
		return nil, err
	}

	/*if err := self.meta.Prepare(path); err != nil {
		return nil, err
	}*/

	var writer io.WriteCloser = newWriter(self, path, info, func(err error) error {
		defer self.states.Release(lock)
		if err != nil {
			return err
		}

		/*if err := self.meta.Finalize(path, info); err != nil {
			return err
		}*/
		if err = self.meta.Insert(path, info); err != nil {
			return err
		}

		return self.runHook(PostCreate, info)
	})

	if opts.Size == 0 {
		writer = newSizeWriter(writer, info)
	}

	if info.Mime == "" {
		writer = newMimeWriter(writer, info)
	}

	return self.runCreateHook(info, writer)
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

func (self *torsten) notFoundOrLog(err error) error {
	if err == ErrNotFound {
		return err
	}
	logrus.WithError(err).Errorf("Unexcepted error %v", err)
	return err
}

func (self *torsten) Remove(path string, o RemoveOptions) error {
	_, err := self.Stat(path, GetOptions{o.Uid, o.Gid})
	if err != nil {
		return self.notFoundOrLog(err)
	}

	if err = self.meta.Remove(path); err != nil {
		return self.notFoundOrLog(err)
	}

	if err = self.data.Remove([]byte(path)); err != nil {
		return self.notFoundOrLog(err)
	}

	return nil

}

func (self *torsten) RemoveAll(path string, o RemoveOptions) error {
	var list []string
	if err := self.List(path, ListOptions{Recursive: true}, func(path string, node *FileInfo) error {
		if !node.IsDir {
			list = append(list, path)
		}
		return nil
	}); err != nil {
		return err
	}

	var wg sync.WaitGroup
	if err := self.meta.Remove(path); err != nil {
		return err
	}

	for _, path := range list {
		wg.Add(1)
		go func(path string) {
			defer wg.Done()
			logrus.Printf("Deleting %s", path)
			self.data.Remove([]byte(path))
		}(path)
	}
	wg.Wait()

	return nil
}

func (self *torsten) Open(path string, o GetOptions) (io.ReadCloser, error) {
	if _, err := self.Stat(path, o); err != nil {
		return nil, err
	}
	return self.data.Get([]byte(path))
}
func (self *torsten) Stat(path string, o GetOptions) (*FileInfo, error) {
	if self.states.HasLock(path) {
		return nil, errors.New("is locked")
	}
	return self.meta.Get(path, o)
}

func (self *torsten) List(prefix string, options ListOptions, fn func(path string, node *FileInfo) error) error {
	return self.meta.List(prefix, options, fn)
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

func (self *torsten) RegisterCreateHook(fn CreateHookFunc) {
	self.lock.Lock()
	defer self.lock.Unlock()

	self.createHooks = append(self.createHooks, fn)
}

func (self *torsten) runCreateHook(info *FileInfo, writer io.WriteCloser) (io.WriteCloser, error) {
	self.lock.RLock()
	defer self.lock.RUnlock()
	var err error
	for _, hook := range self.createHooks {
		if writer, err = hook(info, writer); err != nil {
			return nil, err
		}
	}
	return writer, err
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

	l := &MemoryLock{locks: make(map[Lock]State)}

	return &torsten{
		data:   f,
		meta:   m,
		hooks:  make(map[Hook][]HookFunc),
		states: l,
	}
}
