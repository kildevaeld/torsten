package torsten

import (
	"errors"
	"fmt"
	"io"
	"path/filepath"
	"strings"
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
	log         logrus.FieldLogger
}

func (self *torsten) Create(path string, opts CreateOptions) (io.WriteCloser, error) {
	var e error
	if _, e = self.Stat(path, GetOptions{[]uuid.UUID{opts.Gid}, opts.Uid}); e == nil && opts.Overwrite == false {
		return nil, ErrAlreadyExists
	} else if e == nil {
		if e = self.Remove(path, RemoveOptions{[]uuid.UUID{opts.Gid}, opts.Uid}); e != nil {
			return nil, fmt.Errorf("remove: %s", e)
		}
	}

	name := filepath.Base(path)

	info := &FileInfo{
		Id:     uuid.NewV4(),
		Size:   opts.Size,
		Mime:   opts.Mime,
		Gid:    opts.Gid,
		Uid:    opts.Uid,
		Mode:   opts.Mode,
		Name:   name,
		Hidden: strings.HasPrefix(name, "."),
		Meta:   opts.Meta,
	}
	if info.Meta == nil {
		info.Meta = MetaMap{}
	}

	lock, err := self.states.Acquire(StateCreate, path)
	if err != nil {
		return nil, err
	}

	if err := self.runHook(PreCreate, path, info); err != nil {
		return nil, err
	}

	var writer io.WriteCloser = newWriter(self, path, info, func(err error) error {

		if err != nil {
			self.states.Release(lock)
			return err
		}

		if err = self.meta.Insert(path, info); err != nil {
			self.states.Release(lock)
			return err
		}

		self.states.Release(lock)

		return self.runHook(PostCreate, path, info)
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
	_, err := self.Stat(path, GetOptions{o.Gid, o.Uid})
	if err != nil {
		return self.notFoundOrLog(err)
	}

	if err = self.meta.Remove(path, o); err != nil {
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
			list = append(list, filepath.Join(path, node.Name))
		}
		return nil
	}); err != nil {
		return err
	}

	var wg sync.WaitGroup
	if err := self.meta.Remove(path, o); err != nil {
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

func (self *torsten) Open(pathOrIdOrInfo interface{}, o GetOptions) (io.ReadCloser, error) {
	var (
		stat *FileInfo
		err  error
	)
	if stat, err = self.infoFromInterface(pathOrIdOrInfo, o); err != nil {
		return nil, err
	}

	return self.data.Get([]byte(stat.FullPath()))

}

func (self *torsten) infoFromInterface(v interface{}, o GetOptions) (*FileInfo, error) {
	var (
		stat *FileInfo
		err  error
	)

	switch t := v.(type) {
	case string:
		stat, err = self.meta.Get(t, o)
	case uuid.UUID:
		var s FileInfo
		err = self.meta.GetById(t, &s)

		stat = &s
	case *FileInfo:
		stat = t
	case FileInfo:
		stat = &t
	default:
		return nil, errors.New("type")
	}

	if err != nil {
		return nil, err
	}

	return stat, nil
}

func (self *torsten) Stat(pathOtId interface{}, o GetOptions) (*FileInfo, error) {
	var (
		stat *FileInfo
		err  error
	)

	if stat, err = self.infoFromInterface(pathOtId, o); err != nil {
		return nil, err
	}

	path := stat.FullPath()

	if self.states.HasLock(path) {
		return nil, errors.New("is locked")
	}
	return stat, nil
}

func (self *torsten) List(prefix string, options ListOptions, fn func(path string, node *FileInfo) error) error {
	return self.meta.List(prefix, options, fn)
}

func (self *torsten) Count(path string) (int64, error) {
	return self.meta.Count(path)
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

func (self *torsten) runHook(hook Hook, path string, info *FileInfo) error {
	self.lock.RLock()
	defer self.lock.RUnlock()

	if hooks, ok := self.hooks[hook]; ok {
		for _, h := range hooks {
			if err := h(hook, path, info); err != nil {
				return err
			}
		}
	}

	return nil

}

func New(f filestore.Store, m MetaAdaptor) Torsten {
	return NewWithLogger(f, m, logrus.New())
}

func NewWithLogger(f filestore.Store, m MetaAdaptor, logger logrus.FieldLogger) Torsten {
	l := &MemoryLock{locks: make(map[Lock]State)}

	t := &torsten{
		data:   f,
		meta:   m,
		hooks:  make(map[Hook][]HookFunc),
		states: l,
		log:    logger,
	}

	return t
}
