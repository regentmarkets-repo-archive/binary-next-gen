# Binary Next-Gen

[![Build Status](https://travis-ci.org/binary-com/binary-next-gen.svg?branch=master)](https://travis-ci.org/binary-com/binary-next-gen)
[![Coverage Status](https://coveralls.io/repos/github/binary-com/binary-next-gen/badge.svg?branch=master)](https://coveralls.io/github/binary-com/binary-next-gen?branch=master)
[![Code Climate](https://codeclimate.com/github/binary-com/binary-next-gen/badges/gpa.svg)](https://codeclimate.com/github/binary-com/binary-next-gen)

This repository contains the source code for the Binary Next-Gen [webapp](https://app.binary.com/), [iOS app](https://itunes.apple.com/app/binary-com/id1134884301) and [Android app](https://play.google.com/store/apps/details?id=app.binary.com). 

## Installation

To contribute to Binary Next-Gen, fork this project and checkout the `dev` branch. When you send pull requests (it is recommended you create a separate branch based off `dev` for your commits), remember to set the base branch to `dev` as well.

Once you downloaded the repo, `cd` to project root and execute (you will need [yarn](https://yarnpkg.com)):
```
yarn install
yarn start
```
Now in your web browser go to http://localhost:3000 to see your app.

## Deploy to Your Personal Github Pages

There may be cases when you want to visit your webapp on devices other than your development environment. To do this you can deploy on your personal github.io project page. 

This deployment process is automated using [gulp](https://gulpjs.com/) tasks in the `build` folder. After you have installed gulp globally (`npm install -g gulp`), execute the following from your project root:
```
cd build
yarn install # <- if you have not done so
gulp deploy:test --appId 11108
```
Replace `11108` above with your app id. If you do not have an app id, you can [register for a free app id here](https://developers.binary.com/applications/).

If the command executes successfully, the site will be hosted on `https://<YOUR_USERNAME>.github.io/binary-next-gen/`, where `<YOUR_USERNAME>` is your username. Note that if you login from there it will redirect you to `https://<YOUR_USERNAME>.github.io`. Just change the URL and your app will be up and running again.

## Build for iOS and Android

[Click here to read build instructions for iOS and Android](docs/build-instructions-ios-android)
## Legacy Documentation

*to be moved to docs folder...*

[Build & Start](../../wiki/Build-&-Start)

[Mobile App](../../wiki/Mobile-App)

[Technologies Used](../../wiki/Technologies)

[i18n](../../wiki/i18n)

[Learning Resources](../../wiki/learning)

[![forthebadge](http://forthebadge.com/images/badges/built-by-hipsters.svg)](http://forthebadge.com)
