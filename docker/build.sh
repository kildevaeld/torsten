#!/bin/bash
parent=`dirname $PWD`
#echo $parent

function build_torsten {
    docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten \
    -w /go/src/github.com/kildevaeld/torsten/torsten \
    -ti \
    --name torsten-builder \
    kildevaeld/go-builder sh -c make

    mv ../torsten/torsten torsten
    docker build --tag kildevaeld/torsten .
}

function build_keyval {
    BASE=${GOPATH}/src/github.com/kildevaeld/filestore
    str="run --rm -v $BASE:/go/src/github.com/kildevaeld/filestore \
    -w /go/src/github.com/kildevaeld/filestore/keyval \
    -ti \
    --name keyval-builder \
    kildevaeld/go-builder sh -c make"

    docker $str 
    mv ${BASE}/keyval/keyval keyval
    #docker build --tag kildevaeld/torsten .
}


function build () {
    cd builder
    docker build --tag torsten-builder .
    cd ..
    
    BASE=${GOPATH}/src/github.com/kildevaeld/filestore
    docker run --rm -v "$parent":/go/src/github.com/kildevaeld/torsten \
    -v "$BASE":/go/src/github.com/kildevaeld/filestore \
    -ti \
    --name torsten-builder torsten-builder

    docker rmi torsten-builder
}

build_torsten

docker build --tag kildevaeld/torsten .