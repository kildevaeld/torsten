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
	"fmt"
	"os"

	"github.com/Sirupsen/logrus"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	prefixed "github.com/x-cray/logrus-prefixed-formatter"
)

var VERSION string

var cfgFile string
var logger *logrus.Logger
var versionFlag bool

// RootCmd represents the base command when called without any subcommands
var RootCmd = &cobra.Command{
	Use:   "torsten",
	Short: "A brief description of your application",
	Long:  ``,
	Run: func(cmd *cobra.Command, args []string) {
		if versionFlag {
			fmt.Printf("Torsten v%s\n", VERSION)
			os.Exit(0)
		}
		cmd.Help()
	},
}

// Execute adds all child commands to the root command sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	// Here you will define your flags and configuration settings.
	// Cobra supports Persistent Flags, which, if defined here,
	// will be global for your application.

	RootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.torsten.yaml)")
	RootCmd.PersistentFlags().BoolP("debug", "d", false, "Show verbose output")
	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	RootCmd.Flags().BoolVarP(&versionFlag, "version", "v", false, "Help message for toggle")

	viper.BindPFlag("Debug", RootCmd.PersistentFlags().Lookup("debug"))
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" { // enable ability to specify config file via flag
		viper.SetConfigFile(cfgFile)
	} else {
		viper.SetConfigName(".torsten") // name of config file (without extension)
		viper.AddConfigPath("$HOME")    // adding home directory as first search path
	}

	viper.AutomaticEnv()
	viper.SetEnvPrefix("TORSTEN")

	logger = logrus.New()
	logger.Formatter = new(prefixed.TextFormatter)
	if viper.GetBool("Debug") {
		logger.Level = logrus.DebugLevel

	} else {
		logger.Level = logrus.InfoLevel
	}

	///viper.AutomaticEnv()            // read in environment variables that match
	//viper.SetConfigType("json")

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		logger.Debugf("Using config file: %s", viper.ConfigFileUsed())
	} else {

	}
}
