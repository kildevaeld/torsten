// Copyright © 2016 NAME HERE <EMAIL ADDRESS>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/kildevaeld/torsten"
	"github.com/kildevaeld/torsten/http"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// httpCmd represents the http command
var httpCmd = &cobra.Command{
	Use:   "http",
	Short: "A brief description of your command",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		printError(runHttp())
	},
}

func init() {
	RootCmd.AddCommand(httpCmd)

	httpCmd.Flags().StringP("host", "H", ":3000", "address")
	httpCmd.Flags().BoolP("debug", "d", false, "Show verbose output")
	httpCmd.Flags().Int64("max-request-body", 20*1024*1024, "Maximum request body in bytes")
	httpCmd.Flags().Int64("expires", 60*60*24*7, "Caching in seconds")
	httpCmd.Flags().String("key", "", "key")

	flags := httpCmd.Flags()
	flags.String("filestore", "filesystem", "Filestore to use")
	flags.String("filestore-options", "./torsten_path", "Options")
	flags.String("metastore", "sqlite3", "")
	flags.String("metastore-options", "./torsten_database.sqlite", "")

	viper.BindPFlag("Host", httpCmd.Flags().Lookup("host"))
	viper.BindPFlag("Debug", httpCmd.Flags().Lookup("debug"))
	viper.BindPFlag("Expires", httpCmd.Flags().Lookup("expires"))
	viper.BindPFlag("MaxRequestBody", httpCmd.Flags().Lookup("max-request-body"))
	viper.BindPFlag("Key", httpCmd.Flags().Lookup("key"))

	viper.BindPFlag("Filestore.Driver", flags.Lookup("filestore"))
	viper.BindPFlag("Filestore.Options", flags.Lookup("filestore-options"))
	viper.BindPFlag("Metastore.Driver", flags.Lookup("metastore"))
	viper.BindPFlag("Metastore.Options", flags.Lookup("metastore-options"))
}

func runHttp() error {
	var (
		tors torsten.Torsten
		opts Options
		err  error
		serv *http.HttpServer
	)

	if tors, opts, err = getTorsten(); err != nil {
		return err
	}

	serv = http.NewWithLogger(tors, logger.WithField("prefix", "http"), http.Options{
		Expires:        opts.Expires,
		MaxRequestBody: opts.MaxRequestBody,
		Log:            opts.Debug,
		JWTKey:         []byte(opts.Key),
	})

	signal_chan := make(chan os.Signal, 1)
	signal.Notify(signal_chan,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT)

	exit_chan := make(chan error)

	go func() {
		exit_chan <- serv.Listen(opts.Host)
	}()

	go func() {
		signal := <-signal_chan
		logger.Printf("Signal %s. Existing...", signal)

		exit_chan <- serv.Close()
	}()

	return <-exit_chan

}
