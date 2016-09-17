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

	"github.com/Sirupsen/logrus"
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

	httpCmd.Flags().StringP("address", "a", ":3000", "address")
	httpCmd.Flags().BoolP("verbose", "v", false, "Show verbose output")
	httpCmd.Flags().Int64("max-request-body", 20*1024*1024, "Maximum request body in bytes")
	httpCmd.Flags().Int64("expires", 60*60*24*7, "Caching in seconds")
	viper.BindPFlag("address", httpCmd.Flags().Lookup("address"))
	viper.BindPFlag("verbose", httpCmd.Flags().Lookup("verbose"))
	viper.BindPFlag("expires", httpCmd.Flags().Lookup("expires"))
	viper.BindPFlag("max-request-body", httpCmd.Flags().Lookup("max-request-body"))
}

func runHttp() error {
	var (
		tors torsten.Torsten
		err  error
		serv *http.HttpServer
		log  *logrus.Logger
	)

	if tors, err = getTorsten(); err != nil {
		return err
	}

	//tors.RegisterCreateHook(hooks.ImageHook())

	if log, err = getLogger(); err != nil {
		return err
	}
	if viper.GetBool("verbose") {
		log.Level = logrus.DebugLevel
	} else {
		log.Level = logrus.WarnLevel
	}

	serv = http.NewWithLogger(tors, log, http.Options{
		Expires:        int(viper.GetInt64("expires")),
		MaxRequestBody: int(viper.GetInt64("max-request-body")),
	})

	signal_chan := make(chan os.Signal, 1)
	signal.Notify(signal_chan,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT)

	exit_chan := make(chan error)

	go func() {
		exit_chan <- serv.Listen(viper.GetString("address"))
	}()

	go func() {
		signal := <-signal_chan
		log.Printf("Signal %s. Existing...", signal)

		exit_chan <- serv.Close()
	}()

	return <-exit_chan

}
