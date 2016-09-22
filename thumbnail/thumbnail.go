package thumbnail

import (
	"errors"
	"io"
	"path/filepath"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/workqueue"

	uuid "github.com/satori/go.uuid"
)

var ThumbnailPath = ".thumbnails"

type Size struct {
	W uint
	H uint
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

func (self *Thumbnail) GetThumbnail(pathOrId interface{}, o torsten.GetOptions) (io.ReadCloser, error) {
	var (
		stat *torsten.FileInfo
		//reader io.ReadCloser
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

	/*reader, err = self.dispatcher.RequestAndWait(WorkRequest{
		Info: stat,
		Size: Size{
			W: 64,
			H: 64,
		},
		gen: _generators[stat.Mime],
	})*/
	ri, err = self.dispatcher.RequestAndWait(&request{
		info: stat,
		size: Size{
			W: 96,
			H: 96,
		},
		gen: _generators[stat.Mime],
	})

	if err != nil {
		return nil, err
	}

	return ri.(io.ReadCloser), nil

}

func (self *Thumbnail) createThumbnail(info *torsten.FileInfo) (*torsten.FileInfo, error) {
	if _, ok := info.Meta["thumbnail"]; ok {
		return nil, nil
	}

	var (
		err     error
		writer  io.WriteCloser
		reader  io.ReadCloser
		options torsten.CreateOptions
	)
	if !self.can(info.Mime) {
		return nil, errors.New("cannot create thumbnail")
	}

	tPath := filepath.Join(info.Path, ".thumbnails", info.Name)

	if reader, err = self.torsten.Open(info, torsten.GetOptions{
		Gid: []uuid.UUID{info.Uid},
		Uid: info.Uid,
	}); err != nil {
		return nil, err
	}

	gen := _generators[info.Mime]

	if reader, options, err = gen(reader, Size{100, 100}); err != nil {
		return nil, err
	}

	options.Gid = info.Gid
	options.Uid = info.Uid
	options.Meta = torsten.MetaMap{"thumbnail": info.Id}

	defer reader.Close()

	if writer, err = self.torsten.Create(tPath, options); err != nil {
		return nil, err
	}

	defer writer.Close()
	if _, err = io.Copy(writer, reader); err != nil {
		return nil, err
	}

	return self.torsten.Stat(tPath, torsten.GetOptions{
		Uid: options.Uid,
		Gid: []uuid.UUID{options.Gid},
	})
}

func (self *Thumbnail) createHook(hook torsten.Hook, path string, info *torsten.FileInfo) error {

	if _, ok := info.Meta["thumbnail"]; ok {
		return nil
	}

	var (
		err     error
		writer  io.WriteCloser
		reader  io.ReadCloser
		options torsten.CreateOptions
	)
	if !self.can(info.Mime) {
		return nil
	}

	tPath := filepath.Join(filepath.Dir(path), ".thumbnails", info.Name)

	if reader, err = self.torsten.Open(path, torsten.GetOptions{
		Gid: []uuid.UUID{info.Uid},
		Uid: info.Uid,
	}); err != nil {
		return err
	}

	gen := _generators[info.Mime]

	if reader, options, err = gen(reader, Size{100, 100}); err != nil {
		return err
	}

	options.Gid = info.Gid
	options.Uid = info.Uid
	options.Meta = torsten.MetaMap{"thumbnail": info.Id}

	defer reader.Close()

	if writer, err = self.torsten.Create(tPath, options); err != nil {
		return err
	}

	defer writer.Close()
	if _, err = io.Copy(writer, reader); err != nil {
		return err
	}

	return nil
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
	/*store, _ := filestore.New(filestore.Options{
		Driver: "memory",
	})*/

	queue := workqueue.NewDispatcher()
	tumb := &Thumbnail{t, queue, cache}

	t.RegisterHook(torsten.PostCreate, tumb.createHook)
	return tumb
}
