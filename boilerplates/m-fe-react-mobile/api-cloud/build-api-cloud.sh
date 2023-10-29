#!/bin/bash
set -ex

rm -rf build

mkdir -p build

(cd ../ && yarn install && yarn build && cp -r ./packages/rm-host-app/build/* ./api-cloud/build/)

(cd build && find . -name '*.map' -type f -exec rm -f {} \; && find . -name 'precache-*' -type f -exec rm -f {} \;)

cp main.html ./build/main.html
cp -r icon/ build/icon
cp -r launch/ build/launch
cp api.js build/
cp config.xml build/
cp index.html build/

