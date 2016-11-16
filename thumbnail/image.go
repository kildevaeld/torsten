package thumbnail

import (
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"io/ioutil"
	"os"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/workqueue"
	"github.com/nfnt/resize"
	uuid "github.com/satori/go.uuid"
	"github.com/tevino/abool"
)

type wrap struct {
	file   *os.File
	closed *abool.AtomicBool
}

func (self *wrap) Read(bs []byte) (int, error) {
	if self.closed.IsSet() {
		return 0, io.EOF
	}
	return self.file.Read(bs)

}

func (self *wrap) Close() error {
	if self.closed.IsSet() {
		return nil
	}

	self.closed.Set()

	err := cleanFile(self.file)
	self.file = nil

	return err

}

func cleanFile(file *os.File) error {
	err := file.Close()
	os.Remove(file.Name())
	return err
}

func imageGenerator(mime string) func(r io.Reader, size Size) (io.ReadCloser, torsten.CreateOptions, error) {
	return func(r io.Reader, size Size) (io.ReadCloser, torsten.CreateOptions, error) {

		var (
			img image.Image
			err error
		)
		switch mime {
		case "png":
			img, err = png.Decode(r)
		case "jpeg", "jpg":
			img, err = jpeg.Decode(r)
		case "gif":
			img, err = gif.Decode(r)

		}

		o := torsten.CreateOptions{}
		if err != nil {
			return nil, o, err
		}
		img = resize.Thumbnail(size.Width, size.Height, img, resize.Lanczos3)

		file, err := ioutil.TempFile("", "torsten-thumbnail")
		if err != nil {
			return nil, o, nil
		}

		switch mime {
		case "png":
			err = png.Encode(file, img)
		case "jpeg", "jpg":
			err = jpeg.Encode(file, img, nil)
		case "gif":
			err = gif.Encode(file, img, nil)
		}
		if err != nil {
			cleanFile(file)
			return nil, o, err
		}

		file.Sync()

		if stat, err := file.Stat(); err != nil {
			cleanFile(file)
			return nil, o, nil
		} else {
			o.Size = stat.Size()
			o.Mime = "image/" + mime
		}

		file.Seek(0, 0)

		reader := &wrap{
			file:   file,
			closed: abool.New(),
		}

		return reader, o, nil
	}
}

type request struct {
	info *torsten.FileInfo
	gen  ThumbnailFunc
	size Size
}

func worker(t torsten.Torsten, cache filestore.Store) func(*workqueue.WorkRequest) (interface{}, error) {
	return func(req *workqueue.WorkRequest) (interface{}, error) {

		r := req.Data.(*request)
		info := r.info
		var (
			err    error
			reader io.ReadCloser
			file   io.ReadCloser
		)
		hash := info.Sha1
		if hash == nil || len(hash) == 0 {
			hash = info.Id.Bytes()
		}
		cacheName := []byte(fmt.Sprintf("%x%d%d", hash, r.size.Width, r.size.Height))

		if file, err = cache.Get(cacheName); err == nil {
			return file, nil
		}

		if file, err = t.Open(info, torsten.GetOptions{
			Gid: []uuid.UUID{info.Uid},
			Uid: info.Uid,
		}); err != nil {
			return nil, err
		}
		defer file.Close()

		if file == nil {
			fmt.Println("file was nil")
			return nil, torsten.ErrNotFound
		}
		if reader, _, err = r.gen(file, r.size); err != nil {
			return nil, err
		}

		if err = cache.Set(cacheName, reader, nil); err == nil {
			if file, ok := reader.(*os.File); ok {
				return file, nil
			} else if file, ok := reader.(*wrap); ok {
				return file, nil
			}
			reader.Close()
			reader, err = cache.Get(cacheName)
		}

		return reader, err
	}

}
