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
	"github.com/kildevaeld/torsten/hooks"
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

	viper.BindPFlag("address", httpCmd.Flags().Lookup("address"))

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

	tors.RegisterCreateHook(hooks.ImageHook())

	if log, err = getLogger(); err != nil {
		return err
	}
	log.Level = logrus.DebugLevel

	if serv, err = http.New(tors, log); err != nil {
		return err
	}

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
