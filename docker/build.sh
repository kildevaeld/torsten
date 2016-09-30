#!/bin/bash
parent=`dirname $PWD`
#echo $parent
docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten \
    -w /go/src/github.com/kildevaeld/torsten/torsten \
    -ti \
    --name torsten-builder \
    kildevaeld/go-builder make

mv ../torsten/torsten torsten
