package cmd

import (
	"fmt"
	"strings"

	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/kildevaeld/filestore"
	_ "github.com/kildevaeld/filestore/filesystem"
	_ "github.com/kildevaeld/filestore/memory"
	_ "github.com/kildevaeld/filestore/s3"
	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/adaptors/meta/sqlmeta"
	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/viper"
)

type Options struct {
	Filestore      filestore.Options `json:"filestore"`
	Metastore      sqlmeta.Options   `json:"metastore"`
	Host           string            `json:"host"`
	Key            string            `json:"key"`
	Expires        int               `json:"expires"`
	MaxRequestBody int               `json:"max_request_body`
	Debug          bool
}

func printError(err error) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}

}

type Environ []string

func (self *Environ) Add(env ...string) {
	*self = append(*self, env...)
}

func (self Environ) ToMap() map[string]string {
	env := make(map[string]string)
	for _, e := range self {
		a := strings.SplitN(e, "=", 2)
		env[a[0]] = a[1]
	}
	return env
}

func MapToEnviron(m map[string]string) Environ {
	var out Environ
	for k, v := range m {
		out = append(out, k+"="+v)
	}
	return out
}

func getTorsten() (torsten.Torsten, Options, error) {
	var (
		fs   filestore.Store
		meta torsten.MetaAdaptor
		err  error
	)

	//var fsOptions filestore.Options

	var options Options
	if err = viper.Unmarshal(&options); err != nil {
		return nil, options, err
	}

	if options.Filestore.Driver == "" {
		options.Filestore.Driver = "filesystem"
		options.Filestore.Options = "./torsten_path"
	}

	env := Environ(os.Environ()).ToMap()

	if fs, ok := env["TORSTEN_FILESTORE_DRIVER"]; ok {
		options.Filestore.Driver = fs
	}
	if fs, ok := env["TORSTEN_FILESTORE_OPTIONS"]; ok {
		options.Filestore.Options = fs
	}
	if m, ok := env["TORSTEN_METASTORE_DRIVER"]; ok {
		options.Metastore.Driver = m
	}
	if m, ok := env["TORSTEN_METASTORE_OPTIONS"]; ok {
		options.Metastore.Options = m
	}

	if fs, err = filestore.New(options.Filestore); err != nil {
		return nil, options, err
	}

	if options.Metastore.Driver == "" {
		options.Metastore.Driver = "sqlite3"
	}
	if options.Metastore.Options == "" {
		options.Metastore.Options = "./test.sqlite"
	}

	if meta, err = sqlmeta.NewWithLogger(options.Metastore, logger.WithField("prefix", "meta")); err != nil {
		return nil, options, err
	}

	t := torsten.NewWithLogger(fs, meta, logger)

	return t, options, nil
}
