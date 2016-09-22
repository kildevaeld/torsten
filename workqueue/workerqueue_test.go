package workqueue

import (
	"sync"
	"testing"
	"time"
)

func work(r *WorkRequest) (interface{}, error) {

	//duration := r.Data.(time.Duration)
	//fmt.Printf("req%d sleep for %d\n", r.Id, duration)
	//time.Sleep(duration)

	return nil, nil
}

func TestWorkQueue(t *testing.T) {

	queue := NewDispatcher()

	queue.Start(10, func(id int) Worker {
		return NewWorker(id, work)
	})

	var wg sync.WaitGroup
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			queue.RequestAndWait(time.Second * time.Duration(i))
		}(i)
	}

	wg.Wait()

}

func BenchmarkQueue(t *testing.B) {

	queue := NewDispatcher()

	queue.Start(500, func(id int) Worker {
		return NewWorker(id, work)
	})
	t.ResetTimer()
	t.ReportAllocs()
	var wg sync.WaitGroup
	for i := 0; i < t.N; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			queue.RequestAndWait(time.Second * 0)
		}(i)
	}

	wg.Wait()
}
