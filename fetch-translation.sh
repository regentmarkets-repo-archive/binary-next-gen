#!/usr/bin/env bash

git fetch upstream &&
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)" &&
git checkout upstream/translations &&
cd build/ &&
gulp update-translation &&
git checkout -b update-translations &&
cd ../ &&
git add . &&
git commit -m "Sync translations from weblate" &&
git checkout $CURRENT_BRANCH &&
git checkout update-translations -- src/_constants/po
