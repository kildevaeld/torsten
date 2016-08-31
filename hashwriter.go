package torsten

import (
	"hash"
	"io"
)

type HashWriter struct {
	h hash.Hash
	r io.Writer
}

func (self *HashWriter) Write(bs []byte) (int, error) {

	r, err := self.r.Write(bs)
	if err != nil {
		return r, err
	}

	self.h.Write(bs)

	return r, nil
}

func (self *HashWriter) Sum(bs []byte) []byte {
	return self.h.Sum(bs)
}

func NewHashWriter(r io.Writer, h hash.Hash) *HashWriter {
	return &HashWriter{h, r}

}
