#!/bin/bash
set -ex

ncu -u

(cd ./packages/rm-core && ncu -u)
(cd ./packages/rm-host-app && ncu -u)
(cd ./packages/rm-mobx-app && ncu -u)
