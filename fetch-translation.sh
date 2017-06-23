#!/usr/bin/env bash

GIT_REPO_URL="$(git config --get remote.origin.url)" &&
mkdir temp-translations &&
cd temp-translations &&
git clone --branch translations $GIT_REPO_URL --depth 1 &&
cp -R binary-next-gen/src/_constants/* ../src/_constants/ &&
cd .. &&
rm -fR temp-translations