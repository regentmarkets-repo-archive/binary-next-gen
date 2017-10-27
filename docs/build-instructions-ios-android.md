# Build Instructions (iOS + Android)

*If there are inconsistencies with the build instructions here and the one from the [official cordova docs](https://cordova.apache.org/docs/en/latest/), always favor the latter (and hopefully update the documentation here accordingly!).*

As of this writing, versions are as follows:
 - Cordova v7.0.1
 - Android Studio v3.0
 - XCode 9
 - JDK 8

## Preliminaries
First, make sure Cordova is installed globally (you can test by typing `cordova -v`):
```
npm install -g cordova
```
Prior to building for Cordova, be sure that you already built the binary webapp. You can do it by running `yarn build` in your project directory.

Now you can choose either to build for Android or iOS. Each of the following sections are self-contained. 

## Android
### Setup
If this is the first time you are building the app, add the android platform to Cordova:
```
cordova platform add android
```
This will create a `platform/android` folder in your project repository. 

Now some notes before you [install the requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements):
 + Install JDK 8 - as of this writing JDK 9 is NOT supported!
 + Make sure the API level for the SDK you choose is supported ([check here](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support)) by the version of cordova you are using.
 + If you have installed android-sdk via brew, you need to uninstall it or it will conflict with android studio. To uninstall the brew version of android-sdk, enter to terminal:
```
rm -rf /usr/local/Cellar/android-sdk
rm -rf /usr/local/Caskroom/android-sdk
rm /usr/local/share/android-sdk
```
 + You can find the android sdk directory from the sdk manager itself:

   ![android-sdk-directory](https://bruceoutdoors.files.wordpress.com/2017/10/sdk-link-e1509091030583.png)
   
   Your `~/.bash_profile` should look something like this (place your android SDK directory in `ANDROID_HOME`:
```
export ANDROID_HOME=/Users/bruce/Library/Android/sdk/
export PATH=${PATH}:${ANDROID_HOME}platform-tools:${ANDROID_HOME}tools
```
 + Once you successfully installed everything, be sure to run `cordova requirements android` in your project directory to check that you have all the required dependencies installed.

### Build & Deploy
Now you can build by running the following command in your project directory:
```
cordova build android
```
> NOTE: If you see `spawn EACCESS` errors, run `cordova build android —verbose` to see which directory it fails in and do `chmod 777 “<directory name that spawns EACESS>”`. It is probably gradle or android-sdk.

If there are no errors, the build command will output an apk file. To automatically build and deploy the app to your android device, first plug in your android device (make sure debugging mode is turned on) and enter the following:
```
cordova run android --device
```

## iOS
### Setup
First, using your `binary.com` email (*do not use your personal email!*), you will need to register an [Apple ID](https://appleid.apple.com), followed by [apple developer ID](https://developer.apple.com/account/), and request your manager to add you to Binary's apple developer team (just member access will do).
  
If this is the first time you are building the app, add the iOS platform to Cordova:
```
cordova platform add ios
```
This will create a `platform/ios` folder in your project repository.

Now [install the requirements via the instructions in the official cordova docs](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#installing-the-requirements).

Validate that you have everything you need by running `cordova requirements ios` in the project directory.

Now launch XCode, go to `Preferences...` and add your apple ID. If you are in the binary apple developer team, you should see more than one teams. Make sure "Binary Investments (Europe) Ltd" is one of those teams.

![binary-dev-xcode](https://bruceoutdoors.files.wordpress.com/2017/10/screen-shot-2017-10-27-at-3-07-50-pm-e1509090785600.png)

### Build & Deploy

Because the ios build and run commands are pretty long, we run npm scripts instead.

To build the app, run in project directory `yarn build:ios`, and select "Always Allow" when CodeSign prompts to access KeyChain. This will build the app file. If there are no failures, we are good to go.

To build and deploy automatically, make sure your iOS device is plugged (make sure developer mode is turned on), and then run `yarn start:ios`.
