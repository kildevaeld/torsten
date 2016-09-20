package cmd

import (
	"fmt"
	"io"

	"os"

	"github.com/Sirupsen/logrus"
	_ "github.com/go-sql-driver/mysql"
	"github.com/kildevaeld/filestore"
	_ "github.com/kildevaeld/filestore/memory"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/adaptors/meta/sqlmeta"
	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/viper"
	prefixed "github.com/x-cray/logrus-prefixed-formatter"
)

func printError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}

}

func getTorsten() (torsten.Torsten, error) {
	var (
		fsOptions   filestore.Options
		metaOptions sqlmeta.Options
		fs          filestore.Store
		meta        torsten.MetaAdaptor
		err         error
	)

	//var fsOptions filestore.Options

	if err = viper.UnmarshalKey("filestore", &fsOptions); err != nil {
		return nil, err
	}

	if fsOptions.Driver == "" {
		fsOptions.Driver = "filesystem"
		fsOptions.DriverOptions = "./torsten_path"
	}

	//var metaOptions sqlmeta.Options

	if err = viper.UnmarshalKey("metastore", &metaOptions); err != nil {
		return nil, err
	}

	if fs, err = filestore.New(fsOptions); err != nil {
		return nil, err
	}

	if metaOptions.Driver == "" {
		metaOptions.Driver = "sqlite3"
	}
	if metaOptions.Options == "" {
		metaOptions.Options = "./test.sqlite"
	}
	metaOptions.Debug = true

	if meta, err = sqlmeta.New(metaOptions); err != nil {
		return nil, err
	}

	t := torsten.New(fs, meta)

	//i, e := meta.Clean(time.Now())
	hook := func(hook torsten.Hook, path string, info *torsten.FileInfo) error {
		fmt.Printf("%s: %s\n", hook.String(), path)
		return nil
	}
	t.RegisterHook(torsten.PostCreate, hook)
	t.RegisterHook(torsten.PreCreate, hook)
	t.RegisterHook(torsten.PreGet, hook)
	t.RegisterHook(torsten.PostGet, hook)

	t.RegisterCreateHook(func(i *torsten.FileInfo, w io.WriteCloser) (io.WriteCloser, error) {
		fmt.Printf("Create Hook:\n")
		return w, nil
	})
	return t, nil
}

func getLogger() (*logrus.Logger, error) {

	log := logrus.New()
	log.Formatter = new(prefixed.TextFormatter)

	return log, nil
}
