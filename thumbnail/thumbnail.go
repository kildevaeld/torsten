package thumbnail

import (
	"io"
	"path/filepath"

	"github.com/kildevaeld/torsten"
	"github.com/satori/go.uuid"
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
	torsten torsten.Torsten
}

func (self *Thumbnail) can(mime string) bool {
	if _, ok := _generators[mime]; ok {
		return ok
	}
	return false
}

func (self *Thumbnail) GetThumbnail(pathOrId interface{}, o torsten.GetOptions) (*torsten.FileInfo, error) {
	var (
		stat *torsten.FileInfo
		err  error
	)

	stat, err = self.torsten.Stat(pathOrId, o)
	if err != nil {
		return nil, err
	}

	if stat.Meta.Has("thumbnail") {
		return stat, err
	}

	path := filepath.Join(stat.Path, ThumbnailPath, stat.Name)

	return self.torsten.Stat(path, o)

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

func NewThumbnailer(t torsten.Torsten) *Thumbnail {
	tumb := &Thumbnail{t}

	t.RegisterHook(torsten.PostCreate, tumb.createHook)
	return tumb
}
