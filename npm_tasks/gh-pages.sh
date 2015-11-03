#!/usr/bin/env bash
PROJECT_ROOT="$(git rev-parse --show-toplevel)"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

cd $PROJECT_ROOT

git checkout gh-pages
git checkout $CURRENT_BRANCH -- dist/*
git checkout $CURRENT_BRANCH -- public/*

git add dist/*
git add public/*

git commit -m "deployed from $CURRENT_BRANCH"
git push --force origin gh-pages

git checkout $CURRENT_BRANCH