package cmd

import (
	"fmt"

	"os"

	"github.com/kildevaeld/filestore"
	_ "github.com/kildevaeld/filestore/memory"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/adaptors/meta/sqlmeta"
	"github.com/kildevaeld/torsten/http"
	"github.com/spf13/viper"
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
		fsOptions.Driver = "memory"
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

	if meta, err = sqlmeta.New(metaOptions); err != nil {
		return nil, err
	}

	t := torsten.New(fs, meta)

	return t, nil
}

func getTorstenHttp(t torsten.Torsten) (*http.HttpServer, error) {

	return nil, nil
}
