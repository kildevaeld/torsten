package thumbnail

import (
	"bytes"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"io/ioutil"

	"github.com/kildevaeld/filestore"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/workqueue"
	"github.com/nfnt/resize"
	uuid "github.com/satori/go.uuid"
)

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
		img = resize.Thumbnail(size.W, size.H, img, resize.Lanczos3)

		buf := bytes.NewBuffer(nil)

		switch mime {
		case "png":
			err = png.Encode(buf, img)
		case "jpeg", "jpg":
			err = jpeg.Encode(buf, img, nil)
		case "gif":
			err = gif.Encode(buf, img, nil)
		}
		if err != nil {
			buf.Reset()
			return nil, o, err
		}

		reader := ioutil.NopCloser(bytes.NewReader(buf.Bytes()))
		o.Size = int64(buf.Len())
		o.Mime = "image/" + mime

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
		/*if _, ok := req.Info.Meta["thumbnail"]; ok {
			return nil, errors. //, nil
		}*/

		r := req.Data.(*request)
		info := r.info
		var (
			err error
			//writer  io.WriteCloser
			reader io.ReadCloser
			file   io.ReadCloser
			//options torsten.CreateOptions
		)
		hash := info.Sha1
		if hash == nil || len(hash) == 0 {
			hash = info.Id.Bytes()
		}
		cacheName := []byte(fmt.Sprintf("%x%d%d", hash, r.size.W, r.size.H))

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
			reader.Close()
			reader, err = cache.Get(cacheName)
		}

		return reader, err
	}

}
