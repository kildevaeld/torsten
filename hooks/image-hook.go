package hooks

import (
	"bytes"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"regexp"
	"strings"

	"github.com/kildevaeld/dict"
	"github.com/kildevaeld/torsten"
)

var imageReg = regexp.MustCompile("image\\/(png|jpeg|gif)")

type image_writer struct {
	info   *torsten.FileInfo
	writer io.WriteCloser
	buf    *bytes.Buffer
}

func (self *image_writer) Write(bs []byte) (int, error) {
	self.buf.Write(bs)
	return self.writer.Write(bs)
}

func (self *image_writer) Close() error {
	var (
		image image.Image
		err   error
	)
	mime := self.info.Mime
	if strings.HasSuffix(mime, "png") {
		image, err = png.Decode(self.buf)
	} else if strings.HasPrefix(mime, "jpeg") || strings.HasPrefix(mime, "jpg") {
		image, err = jpeg.Decode(self.buf)
	} else if strings.HasPrefix(mime, "gif") {
		image, err = gif.Decode(self.buf)
	}

	if err != nil {
		return err
	}

	bounds := image.Bounds().Size()

	if self.info.Meta == nil {
		self.info.Meta = torsten.MetaMap{}
	}

	self.info.Meta["image"] = dict.Map{
		"height": bounds.Y,
		"width":  bounds.X,
	}

	self.buf.Reset()

	return self.writer.Close()
}

func isImage(info *torsten.FileInfo) bool {
	return imageReg.Match([]byte(info.Mime))
}

func ImageHook() torsten.CreateHookFunc {
	return func(info *torsten.FileInfo, writer io.WriteCloser) (io.WriteCloser, error) {

		if !isImage(info) {
			return writer, nil
		}
		writer = &image_writer{info, writer, bytes.NewBuffer(nil)}
		return writer, nil
	}
}
