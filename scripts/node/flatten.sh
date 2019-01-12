#!/usr/bin/env bash

if [ -d flats ]; then
  rm -rf temp
fi

mkdir -p temp

for file in `find ./contracts -type f -name "*.sol"`; do
  ./node_modules/.bin/truffle-flattener $file > temp/${file##*/}
done    