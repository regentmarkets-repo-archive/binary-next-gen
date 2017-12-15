#!/bin/bash
set -e

# Do not deploy tag branches
if [ "$TRAVIS_BRANCH" = "dev" ] || [ "$TRAVIS_BRANCH" = "master" ]; then 
    if [ "$TRAVIS_BRANCH" = "dev" ]; then 
        # move dev website to beta folder
        rm -fR beta
        mkdir beta
        mv dist/* beta/
        mv beta dist/
    fi

    mkdir gh-pages
    cd gh-pages
    git clone --branch gh-pages https://$GIT_KEY@github.com/$TRAVIS_REPO_SLUG --depth 1
    cd binary-next-gen
    cp -R ../../dist/* .
    echo "The following files and folders will be deployed:"
    ls
    git config --global user.email "arnab@binary.com"
    git config --global user.name "Arnab Karmakar"
    git config --global push.default simple
    git add --all
    git commit -m 'Commit from TravisCI Build'
    git push
    cd ../..
    rm -fR gh-pages
else
    echo "Branch is not dev or master. Skipping website deployment..."
fi