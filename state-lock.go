package torsten

import (
	"crypto/sha1"
	"errors"
	"sync"
)

type State int

const (
	StateCreate State = iota + 1
	StateRemove
)

type Lock string

func NewLock(path string) Lock {
	b := sha1.New()
	b.Write([]byte(path))
	var bs []byte
	return Lock(string(b.Sum(bs)))
}

type StateLock interface {
	Acquire(state State, path string) (Lock, error)
	Release(lock Lock) error
	HasLock(path string) bool
}

type MemoryLock struct {
	locks map[Lock]State
	lock  sync.RWMutex
}

func (self *MemoryLock) Acquire(state State, path string) (Lock, error) {
	self.lock.Lock()
	defer self.lock.Unlock()
	lock := NewLock(path)
	if _, ok := self.locks[lock]; ok {
		return Lock(""), errors.New("already acquired")
	}
	return Lock(""), nil
}

func (self *MemoryLock) Release(lock Lock) error {
	self.lock.Lock()
	defer self.lock.Unlock()
	if _, ok := self.locks[lock]; !ok {
		return errors.New("no such lock")
	}

	delete(self.locks, lock)

	return nil
}

func (self *MemoryLock) HasLock(path string) bool {
	self.lock.Lock()
	defer self.lock.Unlock()
	if _, ok := self.locks[NewLock(path)]; ok {
		return ok
	}
	return false
}
