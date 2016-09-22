package workqueue

func NewWorker(id int, work func(request *WorkRequest) (interface{}, error)) Worker {
	// Create, and return the worker.
	worker := worker{
		id:     id,
		Work:   make(chan *WorkRequest),
		worker: work,
		//WorkerQueue: workerQueue,
		//resultQueue: responseQueue,
		QuitChan: make(chan bool),
		//d:        d,
		//torsten: t,
	}
	return &worker
}

type worker struct {
	id     int
	worker func(request *WorkRequest) (interface{}, error)
	//torsten     torsten.Torsten
	Work chan *WorkRequest
	//WorkerQueue chan chan WorkRequest
	QuitChan chan bool
	//resultQueue chan WorkResponse
	//log func(str string, args ...interface{})
	//d *Dispatcher
}

func (w *worker) ID() int {
	return w.id
}

// This function "starts" the worker by starting a goroutine, that is
// an infinite "for-select" loop.
func (w *worker) Start(ctx Context) {
	go func() {
		for {
			// Add ourselves into the worker queue.
			//w.d.workerQueue <- w.Work
			ctx.Add(w.Work)
			select {
			case work := <-w.Work:
				// Receive a work request.
				//w.d.log("worker%d: Received work request: %d\n", w.id, work.Id)

				/*stat, err := w.run(&work)
				w.d.resultQueue <- WorkResponse{
					Id:     work.Id,
					Info:   work.Info,
					Reader: stat,
					Err:    err,
				}*/

				result, err := w.worker(work)

				ctx.Done(work.Id, result, err)

				//fmt.Printf("worker%d: Hello, %s!\n", w.ID, work.Info.FullPath())

			case <-w.QuitChan:
				// We have been asked to stop.
				//w.d.log("worker%d stopping\n", w.ID)
				return
			}
		}
	}()
}

func (w *worker) Stop() {
	w.QuitChan <- true
}
