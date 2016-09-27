#!/bin/bash
parent=`dirname $PWD`
echo $parent
docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten -w /go/src/github.com/kildevaeld/torsten/torsten -ti blang/golang-alpine sh
