package thumbnail

import (
	"errors"
	"io"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/workqueue"
)

var ThumbnailPath = ".thumbnails"

type Size struct {
	Width  uint
	Height uint
}

type ThumbnailFunc func(r io.Reader, size Size) (io.ReadCloser, torsten.CreateOptions, error)

var _generators map[string]ThumbnailFunc

func init() {
	_generators = make(map[string]ThumbnailFunc)

	Register("image/png", imageGenerator("png"))
	Register("image/jpeg", imageGenerator("jpeg"))
	Register("image/gif", imageGenerator("gif"))

}

func Register(mime string, fn ThumbnailFunc) {
	_generators[mime] = fn
}

type Thumbnail struct {
	torsten    torsten.Torsten
	dispatcher *workqueue.Dispatcher
	cache      filestore.Store
}

func (self *Thumbnail) can(mime string) bool {
	if _, ok := _generators[mime]; ok {
		return ok
	}
	return false
}

func (self *Thumbnail) GetThumbnail(pathOrId interface{}, o torsten.GetOptions, size Size) (io.ReadCloser, error) {
	var (
		stat *torsten.FileInfo

		ri  interface{}
		err error
	)

	stat, err = self.torsten.Stat(pathOrId, o)
	if err != nil {
		return nil, err
	}

	if !self.can(stat.Mime) {
		return nil, errors.New("cannot")
	}

	ri, err = self.dispatcher.RequestAndWait(&request{
		info: stat,
		size: size,
		gen:  _generators[stat.Mime],
	})

	if err != nil {
		return nil, err
	}

	return ri.(io.ReadCloser), nil

}

func (self *Thumbnail) Start() {
	self.dispatcher.Start(500, func(id int) workqueue.Worker {
		return workqueue.NewWorker(id, worker(self.torsten, self.cache))
	})
}

func (self *Thumbnail) Stop() {
	self.dispatcher.Stop()
}

func NewThumbnailer(t torsten.Torsten, cache filestore.Store) *Thumbnail {

	queue := workqueue.NewDispatcher()
	tumb := &Thumbnail{t, queue, cache}

	return tumb
}
