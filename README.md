# Next-Gen Binary
[![Coverage Status](https://coveralls.io/repos/github/nuruddeensalihu/binary-next-gen/badge.svg?branch=nuru%2Fcoveralls)](https://coveralls.io/github/nuruddeensalihu/binary-next-gen?branch=nuru%2Fcoveralls)

[![Build Status](https://travis-ci.org/binary-com/binary-next-gen.svg?branch=master)](https://travis-ci.org/binary-com/binary-next-gen)
## To run project

```
git clone https://github.com/binary-com/binary-next-gen.git
npm install or sudo npm install
npm start
```
Then open localhost:3000 in a browser

## To update to latest version

```
git pull
npm update (may need sudo)
```

## Deploy new web version

We build with [Gulp](http://gulpjs.com/) and deploy to [GitHub Pages](https://pages.github.com/)

```
cd build
npm install or npm update (may need sudo)
gulp deploy
```

## Build new mobile app version

Use [PhoneGap Build](https://build.phonegap.com/)

Then [Install Shared Apps](https://build.phonegap.com/apps/1774436/share)

## Build new desktop app version

We use [Electron](http://electron.atom.io/) to run as desktop app.

```
npm i electron-prebuilt -g
electron
```

## Technologies Used

* [React](https://facebook.github.io/react/) - the framework
* [React Router](https://github.com/rackt/react-router) - for routing, mapping urls to views
* [Redux](https://github.com/rackt/redux) - state management
* [Immutable.js](https://facebook.github.io/immutable-js/) - immutable data structures

## Build Process
* [npm](https://www.npmjs.com/) - manage dependencies
* [Babel](https://babeljs.io/) - compile ES6 code
* [Webpack](https://webpack.github.io/) - bundle application from modules
* [cordova](https://cordova.apache.org/) - build mobile app

## Project Organization By Directory
* _actions - Redux actions
* _common - Common React Components
* _data - Server/API interaction
* _reducers - Redux reducers
* _routes - React Router route config
* _store - Init for routes and Redux
* _utils - Common utils

## Translations
Please see [Weblate](https://hosted.weblate.org/projects/binary-app/next-gen-app/)

## Useful Learning Resources
[Egghead](https://egghead.io/)

[ES6 Cheatsheet](https://www.youtube.com/watch?v=AfWYO8t7ed4)

[Live React: Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)

[Immutable Data and React](https://www.youtube.com/watch?v=I7IdS-PbEgI)

[Immutable JavaScript: You can't change this](https://www.youtube.com/watch?v=wA98Coal4jk)

[react-router increases your productivity](https://www.youtube.com/watch?v=XZfvW1a8Xac)
