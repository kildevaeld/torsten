
BINARY ?= "torsten"
VERSION ?= "0.0.1"
GOBIN ?= $(shell which go)
GLIDEBIN ?= $(shell which glide)

build: 

ifeq ($(GLIDEBIN),)
	@${GOBIN} get ./...
else
	@${GLIDEBIN} install
endif
	
	