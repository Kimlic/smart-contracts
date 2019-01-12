#!/bin/sh

kill -9 $(lsof -i :7545 -S -t)

ganache-cli -u 0 --gasPrice 0 -p 7545 > /dev/null &
sleep 5
truffle test