#!/bin/bash
set -ex

(cd ./packages/rm-core && yarn lint)
(cd ./packages/rm-components && yarn lint)
(cd ./packages/rm-host-app && yarn lint)

