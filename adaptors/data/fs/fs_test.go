package fs

import (
	"bytes"
	"io/ioutil"
	"os"
	"path/filepath"
	"testing"

	"github.com/kildevaeld/torsten"
	"github.com/stretchr/testify/assert"
)

func TestNewFs(t *testing.T) {

	fss, err := New(FileSystemOptions{
		Path: "./fs_test.go",
	})

	assert.NotNil(t, err)
	assert.Nil(t, fss)

	fss, err = New(FileSystemOptions{
		Path: "./path",
	})

	assert.Nil(t, err)
	assert.NotNil(t, fss)

	os.RemoveAll(fss.(*fs_impl).path)

}

func TestSet(t *testing.T) {

	fss, err := New(FileSystemOptions{
		Path: "./path",
	})

	assert.Nil(t, err)

	defer os.RemoveAll(fss.(*fs_impl).path)

	read := bytes.NewBuffer(nil)
	key := "test/test.txt"

	read.WriteString("Hello, World")
	err = fss.Set(key, read, torsten.CreateOptions{})

	assert.Nil(t, err)

	bs, berr := ioutil.ReadFile(filepath.Join(fss.(*fs_impl).path, key))

	assert.Nil(t, berr)
	assert.Equal(t, "Hello, World", string(bs))

}

func TestGet(t *testing.T) {

	fss, err := New(FileSystemOptions{
		Path: "./path",
	})

	assert.Nil(t, err)

	defer os.RemoveAll(fss.(*fs_impl).path)

	writer := bytes.NewBuffer(nil)
	key := "test/test.txt"

	writer.WriteString("Hello, World")
	err = fss.Set(key, writer, torsten.CreateOptions{})

	assert.Nil(t, err)

	read, rerr := fss.Get(key)

	assert.Nil(t, rerr)

	b, e := ioutil.ReadAll(read)
	assert.Nil(t, e)
	assert.Equal(t, "Hello, World", string(b))

}
