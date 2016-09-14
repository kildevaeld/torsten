package torsten_test

import (
	"testing"

	"github.com/kildevaeld/filestore"
	_ "github.com/kildevaeld/filestore/filesystem"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/adaptors/meta/sqlmeta"
	_ "github.com/mattn/go-sqlite3"
)

func TestCreate(t *testing.T) {

	m, _ := sqlmeta.New(sqlmeta.Options{
		Driver:  "sqlite3",
		Options: "./test.db",
	})

	//defer os.Remove("test.db")

	d, _ := filestore.New(filestore.Options{
		Driver:        "filesystem",
		DriverOptions: "./path",
	})

	tors := torsten.New(d, m)

	w, e := tors.Create("/test.txt", torsten.CreateOptions{})
	if e != nil {
		t.Fatal(e)
	}

	w.Write([]byte("Hello, World"))
	//fmt.Printf("%v", w)
	w.Close()

}
