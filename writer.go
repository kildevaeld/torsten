package torsten

type writer struct {
	path    string
	info    *FileInfo
	buf     *writereader
	torsten *torsten
	//wait    chan struct{}
	err error
}

func (self *writer) Write(bs []byte) (int, error) {
	if self.err != nil {
		return 0, self.err
	}
	return self.buf.Write(bs)
}

func (self *writer) init() error {
	go func() {
		err := self.torsten.data.Set(self.path, self.buf, CreateOptions{
			Size: self.info.Size,
			Mime: self.info.Mime,
		})
		self.err = err
	}()

	return nil
}

func (self *writer) Close() error {
	if self.err != nil {
		return self.err
	}
	err := self.buf.Close()
	if err != nil {
		return err
	}

	return self.torsten.meta.UpdateStatus(self.path, Active)

}

func newWriter(t *torsten, path string, info *FileInfo) *writer {
	return &writer{
		path:    path,
		torsten: t,
		info:    info,
	}
}
