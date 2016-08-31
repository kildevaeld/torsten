package torsten

import (
	"hash"
	"io"
)

type HashReader struct {
	h hash.Hash
	r io.Reader
}

func (self *HashReader) Read(bs []byte) (int, error) {

	r, err := self.r.Read(bs)
	if err != nil {
		return r, err
	}

	self.h.Write(bs)

	return r, nil
}

func (self *HashReader) Sum(bs []byte) []byte {
	return self.h.Sum(bs)
}

func NewHashReader(r io.Reader, h hash.Hash) *HashReader {
	return &HashReader{h, r}

}
