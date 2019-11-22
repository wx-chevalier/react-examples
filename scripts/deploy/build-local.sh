#!/usr/bin/env bash

cd $(dirname $0)/../..

DOCKER_REGISTRY_SERVER=${DOCKER_REGISTRY_SERVER:=registry.xx.com}

IMAGE=${DOCKER_REGISTRY_SERVER}/ufc/m-fe-rtw

# 执行本地编译
yarn build

echo "[*] Finished building"

docker build --tag $IMAGE:latest -f scripts/docker/Dockerfile.local .

echo "[*] Pushing $IMAGE:latest"

docker push $IMAGE:latest
