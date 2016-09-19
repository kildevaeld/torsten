#!/bin/sh



for file in mimetypes/* 
do  
    name=${file##*/}
    curl -F file=@mimetypes/$name http://localhost:3000/${name}2
done