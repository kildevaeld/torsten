package sqlmeta

import (
	"fmt"
	"testing"

	"github.com/kildevaeld/torsten"
	_ "github.com/mattn/go-sqlite3"
	//"github.com/pborman/uuid"
	"github.com/satori/go.uuid"
)

func TestPrepare(t *testing.T) {

	meta, e := New(Options{
		Driver:  "sqlite3",
		Options: "./database.sqlite",
	})
	if e != nil {
		t.Fatal(e)
	}

	err := meta.Prepare("/rasmus/image.png")

	if err != nil {
		t.Fatal(err)
	}

	err = meta.Finalize("/rasmus/image.png", &torsten.FileInfo{
		Name: "image.png",
		Size: 100,
		Mime: "image/png",
		Uid:  1,
		Gid:  1,
		Id:   uuid.NewV4(),
	})

	if err != nil {
		t.Fatal(err)
	}

	/*if info, err := meta.Get("/rasmus/image.png"); err != nil {
		t.Fatal(err)
	} else {
		fmt.Printf("%#v\n", info)
	}*/

	err = meta.List("/rasmus", func(i *torsten.FileNode) error {
		fmt.Printf("NODE %#v\n", i)
		return nil
	})

	if err != nil {
		t.Fatal(err)
	}
}
