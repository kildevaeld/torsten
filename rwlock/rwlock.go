package rwlock

import (
	"errors"
	"fmt"
	"sync"
)

type RWLock interface {
	Lock(key []byte)
	Unlock(key []byte)
	RLock(key []byte)
	RUnlock(key []byte)
	Start()
	Stop()
}

type State int

const (
	RLock State = iota + 1
	Lock
)

type lock_state struct {
	state   State
	readers int
}

type queue_item struct {
	state State
	c     chan struct{}
}

type memory_lock struct {
	lock  sync.RWMutex
	locks map[string]*lock_state
	queue map[string]*Queue
	kill  chan struct{}
	ready chan string
}

func (self *memory_lock) withLock(fn func()) {
	self.lock.Lock()
	fn()
	self.lock.Unlock()
}

func (self *memory_lock) withRLock(fn func()) {
	self.lock.RLock()
	fn()
	self.lock.RUnlock()
}

func (self *memory_lock) Lock(key []byte) {
	var out *queue_item
	self.withLock(func() {
		if _, ok := self.locks[string(key)]; ok {
			out = &queue_item{Lock, make(chan struct{})}
			var q *Queue
			if q, ok = self.queue[string(key)]; !ok {
				q = NewQueue()
				self.queue[string(key)] = q
			}
			q.PushBack(out)
		} else {
			self.locks[string(key)] = &lock_state{
				state: Lock,
			}
		}

	})

	if out != nil {
		<-out.c
	}
}

func (self *memory_lock) Unlock(key []byte) {
	self.withLock(func() {
		if lock, ok := self.locks[string(key)]; !ok {
			panic(errors.New("Not locked"))
		} else if lock.state != Lock {
			panic(fmt.Errorf("RWLock#UnLock invalid state %d", lock.state))
		}
		self.ready <- string(key)
	})

}

func (self *memory_lock) RLock(key []byte) {
	var out *queue_item
	self.withLock(func() {
		if lock, ok := self.locks[string(key)]; ok {
			if lock.state == RLock {
				lock.readers++
				return
			}
			out = &queue_item{RLock, make(chan struct{})}
			var q *Queue
			if q, ok = self.queue[string(key)]; !ok {
				q = NewQueue()
				self.queue[string(key)] = q
			}
			q.PushBack(out)
		} else {
			self.locks[string(key)] = &lock_state{
				state:   RLock,
				readers: 1,
			}
		}

	})

	if out != nil {
		<-out.c
	}
}

func (self *memory_lock) RUnlock(key []byte) {
	isReady := false
	self.withLock(func() {
		if lock, ok := self.locks[string(key)]; ok {
			if lock.state != RLock {
				panic(fmt.Errorf("RWLock#RUnlock Invalid lock state: %d", lock.state))
			}
			lock.readers--
			if lock.readers == 0 {
				isReady = true
				self.ready <- string(key)
			}
		}
	})
	if isReady {

	}

}

func (self *memory_lock) Start() {

	self.ready = make(chan string)
	self.locks = make(map[string]*lock_state)
	self.queue = make(map[string]*Queue)

	go func() {

	loop:
		for {
			select {
			case key := <-self.ready:

				self.withLock(func() {
					q := self.queue[key]
					delete(self.locks, key)

					if q == nil || q.Len() == 0 {
						return
					}

					item := q.PopFront().(*queue_item)
					self.locks[key] = &lock_state{state: item.state}
					if item.state == RLock {
						self.locks[key].readers += 1
					}

					item.c <- struct{}{}
					close(item.c)

					if q.Len() == 0 {
						delete(self.queue, key)
					}
				})

			case <-self.kill:
				break loop
			}

		}

	}()
}

func (self *memory_lock) Stop() {
	self.kill <- struct{}{}
}

func NewLock() RWLock {
	return &memory_lock{}
}
