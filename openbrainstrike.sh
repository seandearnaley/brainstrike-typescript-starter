#!/bin/bash
# open brainstrike

DIR=/home/sean/brainstrike-typescript-starter/
CLIENTPORT=3000
SERVERPORT=4000

cd $DIR
sudo kill -9 $(sudo lsof -t -i:$CLIENTPORT)
sudo kill -9 $(sudo lsof -t -i:$SERVERPORT)
yarn all-start & code . & cmd.exe /C start http://localhost:$CLIENTPORT