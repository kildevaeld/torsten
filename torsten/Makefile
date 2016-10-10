
BINARY=torsten
VERSION?="0.0.5"
OUTDIR?=${PWD}

build:
	@echo "Running go get"
	@go get -x ./...
	@echo "Running go build"
	@go build -ldflags "-s -X github.com/kildevaeld/torsten/torsten/cmd.VERSION=${VERSION}" -o ${OUTDIR}/${BINARY}


install:
	install -m 0755 ${BINARY} /usr/local/bin/${BINARY}