# Development Tools
This document details some tips, tricks and suggestions for your dev tools. The first section details suggestions that are generally applicable to most dev tools, and following sections are specific to what you use (be it text editors or IDE).

## General Guide
### Eslint
Out of the box eslint is setup for you via webpack, and will throw compile errors for your own good, so you need to make sure your javascript conforms to their standards. But, it is much better to have your editor point out your errors instead.

### Wallaby.js
Wallaby runs your unit tests as you develop, and has indicators to see your test coverage from your editor. This repo has a `wallaby.conf.js`, so if your IDE/editor supports that you could install the corresponding extension to enable it. 

Also, it is not free. Ask your manager if your company can pay for a license. (:

## Visual Studio Code 
Here is some extensions recommended for you:
 * ESLint 
 * Flow Language Support - there is a `.flowconfig` file to take advantage of this extension. Also, you would want to have these in your settings file to turn off those red wiggly lines on your flow code:
 ```
"javascript.validate.enable": false,
"flow.useNPMPackagedFlow": true
 ```
 * Git Lens - git on steroids.
 * Git History - view git log, file or line history.
 * Import Cost - see how much each js library weights.
 * npm
 * npm Intellisense
 * Path Intellisense - autocomplete file paths.
 * stylelint
 * SVG Viewer
 * Version Lens - see outdated npm packages in your `package.json`.
 * vscode-icons - pretty icons!
 * Wallaby.js - if you have a license for it.

