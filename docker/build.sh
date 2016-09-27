#!/bin/bash


docker run --rm -v "$PWD":/go/bin blang/golang-alpine go get -x github.com/kildevaeld/torsten/torsten
