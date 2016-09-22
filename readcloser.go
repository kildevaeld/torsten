package torsten

import (
	"errors"
	"io"

	uuid "github.com/satori/go.uuid"
)

type locked_reader struct {
	t      *torsten
	reader io.ReadCloser
	key    []byte
}

func (self *locked_reader) Read(bs []byte) (int, error) {
	return self.reader.Read(bs)
}

func (self *locked_reader) Close() error {

	self.t.states.RUnlock(self.key)

	return self.reader.Close()
}

func get_path(tors *torsten, i interface{}, o GetOptions) (string, error) {
	var (
		stat *FileInfo
		err  error
	)

	switch t := i.(type) {
	case string:
		stat, err = tors.meta.Get(t, o)

	case uuid.UUID:
		var s FileInfo
		err = tors.meta.GetById(t, &s)
		stat = &s
	case *FileInfo:
		stat = t
	case FileInfo:
		stat = &t
	default:
		return "", errors.New("type")
	}

	if err != nil {
		return "", err
	}

	return stat.FullPath(), nil
}

func new_lockedreader(t *torsten, i interface{}, o GetOptions) (io.ReadCloser, error) {

	var (
		reader io.ReadCloser
	)

	path, err := get_path(t, i, o)

	if err != nil {
		return nil, err
	}
	bPath := []byte(path)
	t.states.RLock(bPath)

	if reader, err = t.data.Get(bPath); err != nil {
		t.states.RUnlock(bPath)

		return nil, err
	}

	lrc := locked_reader{t, reader, bPath}

	return &lrc, nil
}
