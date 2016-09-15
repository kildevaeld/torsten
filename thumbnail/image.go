package thumbnail

import (
	"bytes"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"io/ioutil"

	"github.com/kildevaeld/torsten"
	"github.com/nfnt/resize"
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
