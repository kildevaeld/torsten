package rwlock

import "sync"

type Item interface{}

const chunkSize = 64

type chunk struct {
	items        [chunkSize]interface{}
	start, limit int
	next         *chunk
}

type Queue struct {
	head, tail *chunk
	count      int
	lock       sync.Mutex
}

// Create a new empty FIFO queue
func NewQueue() *Queue {
	return &Queue{}
}

// Return the number of items in the queue
func (q *Queue) Len() int {
	q.lock.Lock()
	defer q.lock.Unlock()
	return q.count
}

// Add an item to the end of the queue
func (q *Queue) PushBack(item Item) {
	q.lock.Lock()
	defer q.lock.Unlock()
	if q.head == nil {
		q.tail = new(chunk)
		q.head = q.tail
	} else if q.tail.limit >= chunkSize {
		q.tail.next = new(chunk)
		q.tail = q.tail.next
	}
	q.tail.items[q.tail.limit] = item
	q.tail.limit++
	q.count++
}

// Remove the item at the head of the queue and return it.
//
// REQUIRES: q.Len() > 0
func (q *Queue) PopFront() Item {
	q.lock.Lock()
	defer q.lock.Unlock()
	doAssert(q.count > 0)
	doAssert(q.head.start < q.head.limit)
	item := q.head.items[q.head.start]
	q.head.start++
	q.count--
	if q.head.start >= q.head.limit {
		if q.count == 0 {
			q.head.start = 0
			q.head.limit = 0
			q.head.next = nil
		} else {
			q.head = q.head.next
		}
	}
	return item
}

func doAssert(b bool) {
	if !b {
		panic("fifo_queue assertion failed")
	}
}
