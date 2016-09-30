#!/bin/sh

if [ "$1" = "sh" ]; then
    exec "$@"
fi

exec torsten "$@"