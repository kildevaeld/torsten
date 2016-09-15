// Code generated by go-bindata.
// sources:
// schemas/mysql.sql
// schemas/sqlite.sql
// DO NOT EDIT!

package sqlmeta

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func bindataRead(data, name string) ([]byte, error) {
	gz, err := gzip.NewReader(strings.NewReader(data))
	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}

	var buf bytes.Buffer
	_, err = io.Copy(&buf, gz)
	clErr := gz.Close()

	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}
	if clErr != nil {
		return nil, err
	}

	return buf.Bytes(), nil
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

var _schemasMysqlSql = "\x1f\x8b\x08\x00\x00\x09\x6e\x88\x00\xff\x9c\x54\x4d\x8f\x9b\x30\x10\xbd\xf3\x2b\xe6\x06\x48\xad\x0a\xab\x66\xa5\x55\x4f\x34\x38\x15\x2a\x21\x29\x01\x69\xf7\x04\x2e\x78\x13\x4b\xe0\x20\x70\xaa\xa6\x55\xff\x7b\x6d\xbe\x03\x34\xad\x9a\x53\x84\xdf\xcc\xbc\x79\xef\xd9\xca\xda\x47\x56\x80\x20\xb0\x3e\xba\x08\x9c\x0d\x78\xbb\x00\xd0\xb3\x73\x08\x0e\x10\xbf\xd2\x8c\xc4\xa0\x29\x20\x7e\x71\x42\xd3\x18\xbe\x52\x86\xcb\xab\x66\x3e\xea\xb0\xf7\x9d\xad\xe5\xbf\xc0\x67\xf4\x52\x17\x79\xa1\xeb\xbe\x69\xa0\x0c\xe7\xa2\xee\x1b\x2e\x93\x13\x2e\xb5\x87\xd5\x4a\x9f\x22\x72\x9a\x93\x88\x5f\x8b\x11\x6c\x65\x0c\x28\xb0\xd1\xc6\x0a\xdd\x00\x54\x5c\x14\x19\x4d\x30\xa7\x67\xf6\xee\x9c\x70\xc2\xdf\x56\xbc\x24\x38\x57\xdb\x46\x15\xfd\x41\x24\xad\x23\x65\x7c\x3a\xe4\x22\x19\x8b\xef\x9a\x69\xce\x08\x1c\x97\xce\xfa\xb1\x46\x8b\x2a\x48\x99\x57\x35\x6e\x60\x64\x3e\x19\x2a\xb4\xe7\x09\xa7\x72\xd3\x14\x0b\x62\xe2\x5f\x0f\x5a\x87\xbe\x8f\xbc\x20\x0a\x9c\x2d\x3a\x04\xd6\x76\xdf\xad\x3d\xc1\xef\x3c\x08\xf7\xb6\xd4\xff\x8f\x15\x84\xe3\x41\x23\xd3\x30\x84\x4a\x29\x79\xc5\x97\x8c\x83\xfa\xf3\x57\x27\xc3\x89\xa6\x29\x61\x31\x54\x39\xce\xb2\x7a\xad\x25\x31\x0d\xb5\x15\xed\x84\xcd\xde\xcb\x07\xd1\xb1\x43\x0c\x02\x39\x9e\x8d\x9e\x41\x06\x20\x92\x6e\x46\x94\xa5\xe4\x3b\x68\x8d\xb5\xba\xa2\x7f\x50\x94\xbf\x46\x27\xaa\x38\xe6\x97\xaa\x4f\x50\x81\xf9\xe9\x7e\x2c\xba\x82\x1e\xb3\x98\x89\x44\x04\x80\x53\x76\x54\xff\xcf\x85\xd0\x73\xbe\x84\x68\xbc\x61\x33\x36\x92\xfc\xfa\x45\x6b\xb2\x7a\x53\x31\x8a\x7a\x77\xf0\x8f\x0a\xb0\x73\x3a\xdc\xa0\x36\x72\xe4\x48\xca\x9b\xdb\x83\x2f\xfc\x2c\xe6\x8a\xb5\x72\xc2\x78\xbb\x14\xad\xa2\x94\x96\x31\x88\x45\xaf\x53\x43\xfb\x00\x18\x9d\x04\xb7\xd2\xbe\x37\x9e\x1e\x67\xda\x16\xb8\x14\xdd\xa3\x71\xee\xe7\xb6\x37\xac\x27\x37\x7d\x0e\xdb\xec\x7c\xe4\x7c\xf2\x6a\xf6\x5a\x5f\xa3\x83\x8f\x36\x48\x48\xbe\x46\xdd\xe3\xa1\xd5\xcf\x86\x2e\x83\x6e\x23\x17\xc9\xa0\x5b\x87\xb5\x65\xa3\xa5\x3e\x03\xc3\x79\xa7\x46\x49\x2d\xbe\xd7\xed\xc6\x58\x89\x5f\x72\xb4\x31\xee\x77\x00\x00\x00\xff\xff\x99\x3e\xfc\x5c\xf7\x04\x00\x00"

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

var _schemasSqliteSql = "\x1f\x8b\x08\x00\x00\x09\x6e\x88\x00\xff\xc4\x94\x51\x6f\x9b\x30\x10\xc7\xdf\xf9\x14\xf7\x86\xa9\x3a\x25\xa9\x94\x49\xd3\xb4\x07\x96\x38\x15\x1a\x25\x1d\x21\x52\xfb\x84\x3d\x70\x12\x6b\x60\x10\x38\x5b\xb3\x69\xdf\x7d\x76\x1a\x4c\xc2\x50\x9a\xa9\x9a\xc6\x13\xf2\xdd\xfd\xe5\xbb\xff\xcf\x77\x1f\xba\xb7\x77\x2e\xac\x8a\x8a\xf1\xb5\x88\xbf\xb2\x5d\x0d\x1f\x60\x1e\xbc\xb7\xac\x49\x88\xdd\x08\x43\xe4\x7e\xf4\x31\x78\x33\x08\xe6\x11\xe0\x07\x6f\x11\x2d\x80\xac\x78\xc6\x62\x51\xa4\x8c\x00\xb2\x40\x7d\x84\xa7\x04\xbe\x70\x41\xab\x1d\x1a\xbd\x75\xe0\x3e\xf4\xee\xdc\xf0\x11\x3e\xe1\xc7\xeb\xe7\x84\x92\xca\x0d\x81\x6f\xb4\x4a\x36\xb4\x42\x37\xe3\xb1\xb3\x57\x0c\x96\xbe\x7f\xc8\xd8\x76\x34\x3a\xe1\xf5\xf9\x70\xc9\xaa\xbc\x26\xc0\x85\x84\x29\x9e\xb9\x4b\x3f\x02\x7b\xf4\x6e\x68\x1f\xc2\x89\xe4\xb9\xba\x6d\x4a\x25\xd3\x7f\x26\x07\x35\x27\xc8\x16\xc5\x77\xfb\x1a\xec\xac\x48\x68\xa6\x4f\x6c\xc7\x39\x14\xe7\xaf\x29\x2e\x69\xc5\x84\x8c\x3b\xb7\x6f\x24\xda\x0e\x66\xf3\x10\x7b\xb7\x81\x1e\x19\xa0\xa3\x2a\x07\x42\x3c\xc3\x21\x0e\x26\xf8\x64\xf2\x88\xec\x83\xf3\x40\x69\xf9\x58\x39\x35\x71\x17\x13\x77\x8a\x2d\xa7\x35\x6f\x19\x78\x9f\x97\xca\xbd\x60\x8a\x1f\x3a\x1e\x6a\x8d\x58\x9b\x12\x73\x91\xb2\x27\xad\x73\x22\xbe\xf7\xcb\xb9\x84\x03\x2e\x56\xc5\x05\x1c\x74\x0d\x13\x54\xcf\xf4\x1c\x10\xb9\x9a\x63\x2c\x77\xe5\x51\xda\x78\xd8\x66\xb5\x3e\xd3\xb2\xcc\x78\x42\x25\x2f\xc4\xa0\x48\x94\x25\x6f\x6a\x59\x31\x9a\x37\xe6\xd7\xfc\x07\xd3\xd7\x5a\x6b\x3a\xfe\x28\x1f\xfe\x53\xfe\xe0\xbf\x03\x98\x33\x49\x09\x48\xf6\x24\x21\x65\x2b\xba\xcd\x24\xd8\x3f\x7f\x99\xd9\x6c\xe8\xc8\xf4\x75\x33\xec\x23\x93\x6c\x78\x9a\x32\x41\xa0\xce\x69\x96\xa9\x0e\xd1\xa8\xcf\x05\xf3\xd6\xf6\x68\x9d\x9d\xd6\x29\xeb\x4d\xfe\x6b\x48\xef\x43\xdc\xd0\x19\x6b\xd6\x5a\xce\xcd\x39\x7a\x86\x50\xcb\x0c\xae\x5e\xe4\xbc\x96\x54\x6e\x6b\x43\xfa\xcb\x0b\xad\x29\x30\x39\xbd\xf0\x26\x8a\x54\xc9\xc5\xba\xb3\xa9\xd4\x69\xf6\x57\x3e\x1f\x3d\xb5\xe6\xf5\x5e\xb8\x0a\x8e\xba\xeb\xdd\x08\x87\x3e\xda\x9d\x70\x35\xb0\xd4\xf7\x3b\x00\x00\xff\xff\xdc\xa6\x4b\x22\x3c\x06\x00\x00"

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

