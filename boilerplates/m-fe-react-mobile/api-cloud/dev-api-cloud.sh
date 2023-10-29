#!/bin/bash
set -ex

rm -rf build

mkdir -p build

(cd ../ && cp -r ./packages/rm-host-app/build/* ./api-cloud/build/)

(cd build && find . -name '*.map' -type f -exec rm -f {} \; && find . -name 'precache-*' -type f -exec rm -f {} \;)

cp -r icon/ build/icon
cp -r launch/ build/launch
cp api.js build/
cp config.xml build/
cp index.html build/

# 生成随机数 10~99
function rand(){
    min=$1
    max=$(($2-$min+1))
    num=$(($RANDOM+1000000000)) # 增加一个10位的数再求余
    echo $(($num%$max+$min))
}

rnd=$(rand 10 99)

id=A60292012${rnd}477

sed -i '.bak' 's/A6029201262477/'"$id"/g build/config.xml
