package sqlmeta

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/kildevaeld/torsten"
	_ "github.com/mattn/go-sqlite3"
	"github.com/satori/go.uuid"
	//"github.com/pborman/uuid"

	"github.com/stretchr/testify/assert"
)

var fixture = &torsten.FileInfo{
	Name: "test.txt",
	Size: 234,
	Mime: "text/plain",
	Id:   uuid.NewV4(),
	Gid:  uuid.NewV4(),
	Uid:  uuid.NewV4(),
}

var fixture2 = &torsten.FileInfo{
	Name: "test.txt",
	Size: 234,
	Mime: "text/plain",
	Id:   uuid.NewV4(),
}

type path_pair struct {
	path string
	info *torsten.FileInfo
}

var fixtures = []path_pair{
	path_pair{"/test.txt", &torsten.FileInfo{Name: "test.txt", Size: 200, Mime: "text/plain", Id: uuid.NewV4()}},
	path_pair{"/test2.txt", &torsten.FileInfo{Name: "test2.txt", Size: 200, Mime: "text/plain", Id: uuid.NewV4()}},
	path_pair{"/dir/test.txt", &torsten.FileInfo{Name: "test.txt", Size: 200, Mime: "text/plain", Id: uuid.NewV4()}},
	path_pair{"/dir/subdir/test.txt", &torsten.FileInfo{Name: "test.txt", Size: 200, Mime: "text/plain", Id: uuid.NewV4()}},
}

type node_out struct {
	Id       InfoID `db:"id"`
	Path     string `db:"path"`
	ParentId InfoID `db:"parent_id"`
	FileId   []byte `db:"file_id"`
}

func TestInsert(t *testing.T) {
	m, e := New(Options{
		Driver:  "sqlite3",
		Options: "./insert_database.sqlite",
		Debug:   true,
	})
	if e != nil {
		t.Fatal(e)
	}

	meta := m.(*sqlmeta)

	defer os.Remove("./insert_database.sqlite")

	err := meta.Insert("/test.txt", fixture)
	//err = meta.Insert("/test/test.txt", fixture2)
	if err != nil {
		t.Fatal(err)
	}

	var file File
	if err := meta.db.Get(&file, "SELECT * FROM file_info"); err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, file.Name, fixture.Name, "they should be equal")
	assert.Equal(t, file.Size, fixture.Size, "")
	assert.Equal(t, file.Mime, fixture.Mime, "")

	var nodes []node_out
	if err := meta.db.Select(&nodes, "SELECT id, path, parent_id FROM file_node"); err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, len(nodes), 1, "two nodes")
	assert.Equal(t, "/", nodes[0].Path)
	//assert.Equal(t, "/test.txt", nodes[1].Path)
	//assert.Equal(t, nodes[0].Id, nodes[1].ParentId.Int64)
	//assert.Equal(t, fixture.Id.Bytes(), nodes[1].FileId)
}

func TestGet(t *testing.T) {
	m, e := New(Options{
		Driver:  "sqlite3",
		Options: "./get_database.sqlite",
	})
	if e != nil {
		t.Fatal(e)
	}

	meta := m.(*sqlmeta)

	defer os.Remove("./get_database.sqlite")

	if err := meta.Insert("/test.txt", fixture); err != nil {
		t.Fatal(err)
	}

	info, err := meta.Get("/test.txt", torsten.GetOptions{})
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, info.Name, fixture.Name)
	assert.Equal(t, info.Id.Bytes(), fixture.Id.Bytes())

	info, err = meta.Get("/", torsten.GetOptions{})
	if err != nil {
		t.Fatal(err)
	}

	assert.Equal(t, "/", info.Name)
	assert.Equal(t, true, info.IsDir)

}

/*func TestListRecursive(t *testing.T) {
	m, e := New(Options{
		Driver:  "sqlite3",
		Options: "./list_recursive_database.sqlite",
	})
	if e != nil {
		t.Fatal(e)
	}
	defer os.Remove("./list_recursive_database.sqlite")
	meta := m.(*sqlmeta)

	for _, p := range fixtures {
		if e := meta.Insert(p.path, p.info); e != nil {
			t.Fatal(e)
		}
	}

	var out []path_pair
	err := meta.List("/", torsten.ListOptions{Recursive: true}, func(path string, info *torsten.FileInfo) error {
		out = append(out, path_pair{path, info})
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	//files + dirs
	assert.Equal(t, len(fixtures)+2, len(out))
	assert.Equal(t, fixtures[0].path, out[0].path)
	assert.Equal(t, fixtures[1].path, out[1].path)
	assert.Equal(t, "/dir", out[2].path)
	assert.Equal(t, fixtures[2].path, out[3].path)
	assert.Equal(t, "/dir/subdir", out[4].path)
	assert.Equal(t, fixtures[3].path, out[5].path)
}*/

func TestList(t *testing.T) {
	m, e := New(Options{
		Driver:  "sqlite3",
		Options: "./list_database.sqlite",
		//Debug:   true,
	})
	if e != nil {
		t.Fatal(e)
	}
	defer os.Remove("./list_database.sqlite")
	meta := m.(*sqlmeta)

	for _, p := range fixtures {
		p.info.Gid = uuid.NewV4()
		p.info.Uid = uuid.NewV4()
		if e := meta.Insert(p.path, p.info); e != nil {
			t.Fatal(e)
		}
	}

	var out []path_pair
	meta.List("/", torsten.ListOptions{Recursive: false}, func(path string, info *torsten.FileInfo) error {
		out = append(out, path_pair{path, info})
		fmt.Printf("%#v - %s\n", path, info.Name)
		return nil
	})
	//files + dirs
	assert.Equal(t, 3, len(out))
	assert.Equal(t, filepath.Dir(fixtures[0].path), out[1].path)
	assert.Equal(t, filepath.Dir(fixtures[1].path), out[2].path)
	assert.Equal(t, "/", out[0].path)

}
