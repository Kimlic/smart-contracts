#!/bin/bash

if [ -d build ]; then
  truffle networks --clean
fi

truffle migrate --compile-all --reset --all --network dev