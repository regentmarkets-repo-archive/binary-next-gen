#!/usr/bin/env bash

git fetch upstream &&
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)" &&
git checkout upstream/translations &&
cd build/ &&
gulp po2json &&
cd ../ &&
git checkout $CURRENT_BRANCH &&
git checkout upstream/translations -- src/_constants/po/*.json
