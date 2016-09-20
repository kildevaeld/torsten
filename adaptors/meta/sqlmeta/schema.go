// Code generated by go-bindata.
// sources:
// schemas/mysql.sql
// schemas/sqlite.sql
// DO NOT EDIT!

package sqlmeta

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"time"
	"unsafe"
)

func bindataRead(data, name string) ([]byte, error) {
	var empty [0]byte
	sx := (*reflect.StringHeader)(unsafe.Pointer(&data))
	b := empty[:]
	bx := (*reflect.SliceHeader)(unsafe.Pointer(&b))
	bx.Data = sx.Data
	bx.Len = len(data)
	bx.Cap = bx.Len
	return b, nil
}

type asset struct {
	bytes []byte
	info  os.FileInfo
}

type bindataFileInfo struct {
	name    string
	size    int64
	mode    os.FileMode
	modTime time.Time
}

func (fi bindataFileInfo) Name() string {
	return fi.name
}
func (fi bindataFileInfo) Size() int64 {
	return fi.size
}
func (fi bindataFileInfo) Mode() os.FileMode {
	return fi.mode
}
func (fi bindataFileInfo) ModTime() time.Time {
	return fi.modTime
}
func (fi bindataFileInfo) IsDir() bool {
	return false
}
func (fi bindataFileInfo) Sys() interface{} {
	return nil
}

var _schemasMysqlSql = "\x43\x52\x45\x41\x54\x45\x20\x54\x41\x42\x4c\x45\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x20\x28\x0a\x20\x20\x20\x20\x60\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x50\x52\x49\x4d\x41\x52\x59\x20\x4b\x45\x59\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x70\x61\x74\x68\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x32\x35\x35\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x75\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x67\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x70\x65\x72\x6d\x73\x60\x20\x69\x6e\x74\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x35\x30\x30\x27\x2c\x0a\x20\x20\x20\x20\x60\x63\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x2c\x0a\x20\x20\x20\x20\x60\x6d\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x20\x4f\x4e\x20\x55\x50\x44\x41\x54\x45\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x2c\x0a\x20\x20\x20\x20\x60\x70\x61\x72\x65\x6e\x74\x5f\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x68\x69\x64\x64\x65\x6e\x60\x20\x73\x6d\x61\x6c\x6c\x69\x6e\x74\x28\x31\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x30\x2c\x0a\x20\x20\x20\x20\x46\x4f\x52\x45\x49\x47\x4e\x20\x4b\x45\x59\x20\x28\x60\x70\x61\x72\x65\x6e\x74\x5f\x69\x64\x60\x29\x20\x52\x45\x46\x45\x52\x45\x4e\x43\x45\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x28\x60\x69\x64\x60\x29\x20\x4f\x4e\x20\x44\x45\x4c\x45\x54\x45\x20\x43\x41\x53\x43\x41\x44\x45\x2c\x0a\x20\x20\x20\x20\x55\x4e\x49\x51\x55\x45\x20\x49\x4e\x44\x45\x58\x20\x6e\x6f\x64\x65\x5f\x70\x61\x74\x68\x5f\x69\x6e\x64\x65\x78\x20\x28\x60\x70\x61\x74\x68\x60\x29\x0a\x29\x3b\x0a\x0a\x43\x52\x45\x41\x54\x45\x20\x54\x41\x42\x4c\x45\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x60\x66\x69\x6c\x65\x5f\x69\x6e\x66\x6f\x60\x20\x28\x0a\x20\x20\x20\x20\x60\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x50\x52\x49\x4d\x41\x52\x59\x20\x4b\x45\x59\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x6e\x61\x6d\x65\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x32\x35\x35\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x6d\x69\x6d\x65\x5f\x74\x79\x70\x65\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x35\x30\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6f\x63\x74\x65\x74\x2d\x73\x74\x72\x65\x61\x6d\x27\x2c\x0a\x20\x20\x20\x20\x60\x73\x69\x7a\x65\x60\x20\x62\x69\x67\x69\x6e\x74\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x30\x2c\x0a\x20\x20\x20\x20\x60\x75\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x67\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x70\x65\x72\x6d\x73\x60\x20\x69\x6e\x74\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x35\x30\x30\x27\x20\x2c\x0a\x20\x20\x20\x20\x60\x63\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x2c\x0a\x20\x20\x20\x20\x60\x6d\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x20\x4f\x4e\x20\x55\x50\x44\x41\x54\x45\x20\x43\x55\x52\x52\x45\x4e\x54\x5f\x54\x49\x4d\x45\x53\x54\x41\x4d\x50\x2c\x0a\x20\x20\x20\x20\x60\x6d\x65\x74\x61\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x31\x30\x30\x30\x29\x20\x64\x65\x66\x61\x75\x6c\x74\x20\x27\x7b\x7d\x27\x2c\x0a\x20\x20\x20\x20\x60\x73\x68\x61\x31\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x32\x30\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x68\x69\x64\x64\x65\x6e\x60\x20\x73\x6d\x61\x6c\x6c\x69\x6e\x74\x28\x31\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x30\x27\x2c\x0a\x20\x20\x20\x20\x60\x6e\x6f\x64\x65\x5f\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x46\x4f\x52\x45\x49\x47\x4e\x20\x4b\x45\x59\x20\x28\x60\x6e\x6f\x64\x65\x5f\x69\x64\x60\x29\x20\x52\x45\x46\x45\x52\x45\x4e\x43\x45\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x28\x60\x69\x64\x60\x29\x20\x4f\x4e\x20\x44\x45\x4c\x45\x54\x45\x20\x43\x41\x53\x43\x41\x44\x45\x2c\x0a\x20\x20\x20\x20\x49\x4e\x44\x45\x58\x20\x66\x69\x6c\x65\x5f\x69\x6e\x66\x6f\x5f\x6e\x61\x6d\x65\x5f\x69\x6e\x64\x65\x78\x20\x28\x60\x6e\x61\x6d\x65\x60\x29\x0a\x29\x3b\x0a\x0a"

func schemasMysqlSqlBytes() ([]byte, error) {
	return bindataRead(
		_schemasMysqlSql,
		"schemas/mysql.sql",
	)
}

func schemasMysqlSql() (*asset, error) {
	bytes, err := schemasMysqlSqlBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "schemas/mysql.sql", size: 0, mode: os.FileMode(0), modTime: time.Unix(0, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

var _schemasSqliteSql = "\x50\x52\x41\x47\x4d\x41\x20\x66\x6f\x72\x65\x69\x67\x6e\x5f\x6b\x65\x79\x73\x20\x3d\x20\x4f\x4e\x3b\x0a\x0a\x43\x52\x45\x41\x54\x45\x20\x54\x41\x42\x4c\x45\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x20\x28\x0a\x20\x20\x20\x20\x60\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x50\x52\x49\x4d\x41\x52\x59\x20\x4b\x45\x59\x2c\x0a\x20\x20\x20\x20\x60\x70\x61\x74\x68\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x32\x35\x35\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x75\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x67\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x70\x65\x72\x6d\x73\x60\x20\x69\x6e\x74\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x35\x30\x30\x27\x2c\x0a\x20\x20\x20\x20\x60\x63\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x28\x64\x61\x74\x65\x74\x69\x6d\x65\x28\x27\x6e\x6f\x77\x27\x2c\x20\x27\x6c\x6f\x63\x61\x6c\x74\x69\x6d\x65\x27\x29\x29\x2c\x0a\x20\x20\x20\x20\x60\x6d\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x28\x64\x61\x74\x65\x74\x69\x6d\x65\x28\x27\x6e\x6f\x77\x27\x2c\x20\x27\x6c\x6f\x63\x61\x6c\x74\x69\x6d\x65\x27\x29\x29\x2c\x0a\x20\x20\x20\x20\x60\x70\x61\x72\x65\x6e\x74\x5f\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x68\x69\x64\x64\x65\x6e\x60\x20\x73\x6d\x61\x6c\x6c\x69\x6e\x74\x28\x31\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x30\x2c\x0a\x20\x20\x20\x20\x46\x4f\x52\x45\x49\x47\x4e\x20\x4b\x45\x59\x20\x28\x60\x70\x61\x72\x65\x6e\x74\x5f\x69\x64\x60\x29\x20\x52\x45\x46\x45\x52\x45\x4e\x43\x45\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x28\x60\x69\x64\x60\x29\x20\x4f\x4e\x20\x44\x45\x4c\x45\x54\x45\x20\x43\x41\x53\x43\x41\x44\x45\x0a\x29\x3b\x0a\x0a\x43\x52\x45\x41\x54\x45\x20\x55\x4e\x49\x51\x55\x45\x20\x49\x4e\x44\x45\x58\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x6e\x6f\x64\x65\x5f\x70\x61\x74\x68\x5f\x69\x6e\x64\x65\x78\x20\x4f\x4e\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x28\x60\x70\x61\x74\x68\x60\x29\x3b\x0a\x0a\x43\x52\x45\x41\x54\x45\x20\x54\x41\x42\x4c\x45\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x60\x66\x69\x6c\x65\x5f\x69\x6e\x66\x6f\x60\x20\x28\x0a\x20\x20\x20\x20\x60\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x50\x52\x49\x4d\x41\x52\x59\x20\x4b\x45\x59\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x6e\x61\x6d\x65\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x32\x35\x35\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x6d\x69\x6d\x65\x5f\x74\x79\x70\x65\x60\x20\x76\x61\x72\x63\x68\x61\x72\x28\x35\x30\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6f\x63\x74\x65\x74\x2d\x73\x74\x72\x65\x61\x6d\x27\x2c\x0a\x20\x20\x20\x20\x60\x73\x69\x7a\x65\x60\x20\x62\x69\x67\x69\x6e\x74\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x30\x2c\x0a\x20\x20\x20\x20\x60\x75\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x67\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x70\x65\x72\x6d\x73\x60\x20\x69\x6e\x74\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x35\x30\x30\x27\x20\x2c\x0a\x20\x20\x20\x20\x60\x63\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x28\x64\x61\x74\x65\x74\x69\x6d\x65\x28\x27\x6e\x6f\x77\x27\x2c\x20\x27\x6c\x6f\x63\x61\x6c\x74\x69\x6d\x65\x27\x29\x29\x2c\x0a\x20\x20\x20\x20\x60\x6d\x74\x69\x6d\x65\x60\x20\x64\x61\x74\x65\x74\x69\x6d\x65\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x28\x64\x61\x74\x65\x74\x69\x6d\x65\x28\x27\x6e\x6f\x77\x27\x2c\x20\x27\x6c\x6f\x63\x61\x6c\x74\x69\x6d\x65\x27\x29\x29\x2c\x0a\x20\x20\x20\x20\x60\x6d\x65\x74\x61\x60\x20\x74\x65\x78\x74\x20\x64\x65\x66\x61\x75\x6c\x74\x20\x27\x7b\x7d\x27\x2c\x0a\x20\x20\x20\x20\x60\x73\x68\x61\x31\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x32\x30\x29\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x60\x68\x69\x64\x64\x65\x6e\x60\x20\x73\x6d\x61\x6c\x6c\x69\x6e\x74\x28\x31\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x20\x44\x45\x46\x41\x55\x4c\x54\x20\x27\x30\x27\x2c\x0a\x20\x20\x20\x20\x60\x6e\x6f\x64\x65\x5f\x69\x64\x60\x20\x62\x69\x6e\x61\x72\x79\x28\x31\x36\x29\x20\x4e\x4f\x54\x20\x4e\x55\x4c\x4c\x2c\x0a\x20\x20\x20\x20\x46\x4f\x52\x45\x49\x47\x4e\x20\x4b\x45\x59\x20\x28\x60\x6e\x6f\x64\x65\x5f\x69\x64\x60\x29\x20\x52\x45\x46\x45\x52\x45\x4e\x43\x45\x53\x20\x60\x66\x69\x6c\x65\x5f\x6e\x6f\x64\x65\x60\x28\x60\x69\x64\x60\x29\x20\x4f\x4e\x20\x44\x45\x4c\x45\x54\x45\x20\x43\x41\x53\x43\x41\x44\x45\x0a\x29\x3b\x0a\x0a\x43\x52\x45\x41\x54\x45\x20\x49\x4e\x44\x45\x58\x20\x49\x46\x20\x4e\x4f\x54\x20\x45\x58\x49\x53\x54\x53\x20\x66\x69\x6c\x65\x5f\x69\x6e\x66\x6f\x5f\x6e\x61\x6d\x65\x5f\x69\x6e\x64\x65\x78\x20\x4f\x4e\x20\x66\x69\x6c\x65\x5f\x69\x6e\x66\x6f\x28\x60\x6e\x61\x6d\x65\x60\x29\x3b\x0a\x0a"

func schemasSqliteSqlBytes() ([]byte, error) {
	return bindataRead(
		_schemasSqliteSql,
		"schemas/sqlite.sql",
	)
}

func schemasSqliteSql() (*asset, error) {
	bytes, err := schemasSqliteSqlBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "schemas/sqlite.sql", size: 0, mode: os.FileMode(0), modTime: time.Unix(0, 0)}
	a := &asset{bytes: bytes, info: info}
	return a, nil
}

// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("Asset %s can't read by error: %v", name, err)
		}
		return a.bytes, nil
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// MustAsset is like Asset but panics when Asset would return an error.
// It simplifies safe initialization of global variables.
func MustAsset(name string) []byte {
	a, err := Asset(name)
	if err != nil {
		panic("asset: Asset(" + name + "): " + err.Error())
	}

	return a
}

// AssetInfo loads and returns the asset info for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func AssetInfo(name string) (os.FileInfo, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("AssetInfo %s can't read by error: %v", name, err)
		}
		return a.info, nil
	}
	return nil, fmt.Errorf("AssetInfo %s not found", name)
}

// AssetNames returns the names of the assets.
func AssetNames() []string {
	names := make([]string, 0, len(_bindata))
	for name := range _bindata {
		names = append(names, name)
	}
	return names
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string]func() (*asset, error){
	"schemas/mysql.sql": schemasMysqlSql,
	"schemas/sqlite.sql": schemasSqliteSql,
}

// AssetDir returns the file names below a certain
// directory embedded in the file by go-bindata.
// For example if you run go-bindata on data/... and data contains the
// following hierarchy:
//     data/
//       foo.txt
//       img/
//         a.png
//         b.png
// then AssetDir("data") would return []string{"foo.txt", "img"}
// AssetDir("data/img") would return []string{"a.png", "b.png"}
// AssetDir("foo.txt") and AssetDir("notexist") would return an error
// AssetDir("") will return []string{"data"}.
func AssetDir(name string) ([]string, error) {
	node := _bintree
	if len(name) != 0 {
		cannonicalName := strings.Replace(name, "\\", "/", -1)
		pathList := strings.Split(cannonicalName, "/")
		for _, p := range pathList {
			node = node.Children[p]
			if node == nil {
				return nil, fmt.Errorf("Asset %s not found", name)
			}
		}
	}
	if node.Func != nil {
		return nil, fmt.Errorf("Asset %s not found", name)
	}
	rv := make([]string, 0, len(node.Children))
	for childName := range node.Children {
		rv = append(rv, childName)
	}
	return rv, nil
}

type bintree struct {
	Func     func() (*asset, error)
	Children map[string]*bintree
}
var _bintree = &bintree{nil, map[string]*bintree{
	"schemas": &bintree{nil, map[string]*bintree{
		"mysql.sql": &bintree{schemasMysqlSql, map[string]*bintree{}},
		"sqlite.sql": &bintree{schemasSqliteSql, map[string]*bintree{}},
	}},
}}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(dir, name string) error {
	data, err := Asset(name)
	if err != nil {
		return err
	}
	info, err := AssetInfo(name)
	if err != nil {
		return err
	}
	err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
	if err != nil {
		return err
	}
	err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
	if err != nil {
		return err
	}
	err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
	if err != nil {
		return err
	}
	return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(dir, name string) error {
	children, err := AssetDir(name)
	// File
	if err != nil {
		return RestoreAsset(dir, name)
	}
	// Dir
	for _, child := range children {
		err = RestoreAssets(dir, filepath.Join(name, child))
		if err != nil {
			return err
		}
	}
	return nil
}

func _filePath(dir, name string) string {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}

