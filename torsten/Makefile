
BINARY=torsten
VERSION?="0.0.6"
OUTDIR?=${PWD}
FLAGS= -tags libmagic

build:
	@echo "Downloading dependencies ..."
	@go get -x ./...
	@go get -x github.com/rakyll/magicmime
	@echo "Running go build ..."
	@go build ${FLAGS} -ldflags "-s -X github.com/kildevaeld/torsten/torsten/cmd.VERSION=${VERSION}" -o ${OUTDIR}/${BINARY}


install:
	install -m 0755 ${BINARY} /usr/local/bin/${BINARY}