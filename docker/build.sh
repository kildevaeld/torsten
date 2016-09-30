#!/bin/bash
parent=`dirname $PWD`
#echo $parent
docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten \
    -w /go/src/github.com/kildevaeld/torsten/torsten \
    -ti \
    --name torsten-builder \
    kildevaeld/go-builder sh make

mv ../torsten/torsten torsten
docker build --tag kildevaeld/torsten .