#!/bin/sh
parent=`dirname $PWD`
#echo $parent

build_torsten() {
    docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten \
    -w /go/src/github.com/kildevaeld/torsten/torsten \
    -ti \
    --name torsten-builder \
    torsten-builder sh -c make

    mv ../torsten/torsten torsten
    docker build --tag kildevaeld/torsten .
}



build() {
    
    cd builder
    docker build --tag torsten-builder .
    cd ..
    
    build_torsten
    
    docker rmi torsten-builder
}


build

