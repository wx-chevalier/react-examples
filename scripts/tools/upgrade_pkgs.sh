#!/bin/bash
set -ex

ncu -u
 
(cd ./packages/fc-sg-core && ncu -u)
(cd ./packages/rtw-bootstrap && ncu -u)
(cd ./packages/fc-sg-react && ncu -u)
(cd ./packages/rtw-mobx-app && ncu -u)
