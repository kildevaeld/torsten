package thumbnail

import (
	"fmt"
	"io"
	"sync"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten"
	uuid "github.com/satori/go.uuid"
)

//var WorkQueue = make(chan WorkRequest, 10)

type WorkRequest struct {
	Id   int64
	Info *torsten.FileInfo
	Size Size
	gen  ThumbnailFunc
}

type WorkResponse struct {
	Id     int64
	Reader io.ReadCloser
	Info   *torsten.FileInfo
	Err    error
}

// NewWorker creates, and returns a new Worker object. Its only argument
// is a channel that the worker can add itself to whenever it is done its
// work.
func NewWorker(id int, d *Dispatcher) Worker {
	// Create, and return the worker.
	worker := Worker{
		ID:   id,
		Work: make(chan WorkRequest),
		//WorkerQueue: workerQueue,
		//resultQueue: responseQueue,
		QuitChan: make(chan bool),
		d:        d,
		//torsten: t,
	}
	return worker
}

type Worker struct {
	ID int
	//torsten     torsten.Torsten
	Work chan WorkRequest
	//WorkerQueue chan chan WorkRequest
	QuitChan chan bool
	//resultQueue chan WorkResponse
	//log func(str string, args ...interface{})
	d *Dispatcher
}

// This function "starts" the worker by starting a goroutine, that is
// an infinite "for-select" loop.
func (w *Worker) Start() {
	go func() {
		for {
			// Add ourselves into the worker queue.
			w.d.workerQueue <- w.Work

			select {
			case work := <-w.Work:
				// Receive a work request.
				w.d.log("worker%d: Received work request: %d\n", w.ID, work.Id)

				stat, err := w.run(&work)
				w.d.resultQueue <- WorkResponse{
					Id:     work.Id,
					Info:   work.Info,
					Reader: stat,
					Err:    err,
				}

				//fmt.Printf("worker%d: Hello, %s!\n", w.ID, work.Info.FullPath())

			case <-w.QuitChan:
				// We have been asked to stop.
				w.d.log("worker%d stopping\n", w.ID)
				return
			}
		}
	}()
}

func (w *Worker) run(req *WorkRequest) (io.ReadCloser, error) {
	/*if _, ok := req.Info.Meta["thumbnail"]; ok {
		return nil, errors. //, nil
	}*/
	info := req.Info
	var (
		err error
		//writer  io.WriteCloser
		reader io.ReadCloser
		file   io.ReadCloser
		//options torsten.CreateOptions
	)

	if file, err = w.d.torsten.Open(info, torsten.GetOptions{
		Gid: []uuid.UUID{info.Uid},
		Uid: info.Uid,
	}); err != nil {
		return nil, err
	}
	defer file.Close()

	if reader, _, err = req.gen(file, req.Size); err != nil {
		return nil, err
	}

	return reader, err
}

// Stop tells the worker to stop listening for work requests.
//
// Note that the worker will only stop *after* it has finished its work.
func (w *Worker) Stop() {
	go func() {
		w.QuitChan <- true
	}()
}

type Dispatcher struct {
	torsten       torsten.Torsten
	workerQueue   chan chan WorkRequest
	workQueue     chan WorkRequest
	workers       []Worker
	resultQueue   chan WorkResponse
	kill          chan struct{}
	lock          sync.RWMutex
	responseQueue map[int64]chan WorkResponse
	cache         filestore.Store
	id            int64
	log           func(str string, args ...interface{})
}

func (self *Dispatcher) Request(r WorkRequest) {
	self.withLock(func() {
		self.id++
		r.Id = self.id
	})
	self.workQueue <- r
}

func (self *Dispatcher) withLock(fn func()) {
	self.lock.Lock()
	fn()
	self.lock.Unlock()
}

func (self *Dispatcher) RequestAndWait(r WorkRequest) (io.ReadCloser, error) {

	c := make(chan WorkResponse, 1)

	self.withLock(func() {
		self.id++
		r.Id = self.id
		self.responseQueue[r.Id] = c
	})
	self.log("request and wait: %d\n", r.Id)
	self.workQueue <- r
	result := <-c

	self.withLock(func() {
		delete(self.responseQueue, result.Id)
	})
	self.log("request and wait done: %d\n", r.Id)
	return result.Reader, result.Err

}

func (self *Dispatcher) Start(nworkers int) {
	if self.workerQueue != nil {
		return
	}
	self.workQueue = make(chan WorkRequest, 100)
	self.workerQueue = make(chan chan WorkRequest, nworkers)
	self.kill = make(chan struct{})
	self.resultQueue = make(chan WorkResponse, 100)
	self.responseQueue = make(map[int64]chan WorkResponse)

	for i := 0; i < nworkers; i++ {
		self.log("Starting worker: %d\n", i+1)
		//worker := NewWorker(i+1, self.torsten, self.workerQueue, self.resultQueue)
		worker := NewWorker(i+1, self)
		self.workers = append(self.workers, worker)
		worker.Start()
	}

	dispath_result := func(r WorkResponse) {
		self.lock.RLock()
		c, ok := self.responseQueue[r.Id]
		self.lock.RUnlock()
		if !ok {
			return
		}
		c <- r
	}

	go func() {
		for {
			select {
			case work := <-self.workQueue:
				self.log("Received work request %d\n", work.Id)
				result, err := self.cache.Get(work.Info.Id.Bytes())

				if err == nil {

					go dispath_result(WorkResponse{
						Id:     work.Id,
						Err:    nil,
						Reader: result,
						Info:   work.Info,
					})

				} else {
					go func() {
						worker := <-self.workerQueue

						self.log("Dispatching work request: %d\n", work.Id)
						worker <- work
					}()
				}

			case result := <-self.resultQueue:
				self.log("Received result %d\n", result.Id)
				go func() {
					if result.Err == nil {
						if err := self.cache.Set(result.Info.Id.Bytes(), result.Reader, nil); err == nil {
							reader, err := self.cache.Get(result.Info.Id.Bytes())
							if err != nil {
								panic(err)
							}
							result.Reader.Close()
							result.Reader = reader
						}
					}

					dispath_result(result)
				}()

			case <-self.kill:
				return
			}
		}
	}()
}

func (self *Dispatcher) Stop() {
	if self.workerQueue == nil {
		return
	}

	self.kill <- struct{}{}

	close(self.kill)
	close(self.workerQueue)
	close(self.workQueue)
	close(self.resultQueue)

}

func NewQueue(t torsten.Torsten, cache filestore.Store, log bool) *Dispatcher {
	d := &Dispatcher{
		torsten: t,
		cache:   cache,
		log:     func(str string, args ...interface{}) {},
	}

	if log {
		d.log = func(str string, args ...interface{}) {
			fmt.Printf(str, args...)
		}
	}
	return d
}
