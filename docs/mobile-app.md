# Mobile App

*This is legacy documentation. It will either be updated or replaced in the future.*

[Submit Apache Cordova Applications to the Apple App Store & Google Play](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/)

## Prepare Your Environment

```
npm install -g cordova
cordova platform add ios --save
cordova platform add android --save
npm install -g code-push-cli
```


## Run the App in an iOS Emulator

You need an OSX machine with XCode installed

```
cordova build ios
cordova run ios
```

## Run the App in an Android Emulator

You need JDK + Android SDK + emulator images installed

```
cordova build android
cordova run android
```

For other platforms, replace ios for the platform name.

## Prepare a release binary

```
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore tick-trade-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk TickTrade
~/Library/Android/sdk/build-tools/24.0.0/zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk ./platforms/android/build/outputs/apk/android-release-aligned.apk
```

## Publish an Update

#### Login to code-push

```
code-push login
```

#### List apps

```
code-push app ls
```

#### Publish update
```
code-push release-cordova binary-next-gen-android android
code-push release-cordova binary-next-gen-ios ios
```

## Deploy app to app store and google play.

To deploy or submit your app to an app store , some configurations are necessary . These are a one time settings that would be stored on your device once configure.

### Submit .ipa to the app store

Once you are satisfied with your changes and is ready to submit a release to ios app store. You need to run the command 

`$ cordova build --release ios` 

The above command update the .xcodeproj located in your `project-root-folder/platforms/ios/Binary.com.xcodeproj`

Next , you would need an ios distributing certificate .The creating IOS distributing certificate requires an apple developer account so visit http://developer.apple.com/. In our case, you may need to either get invited by the admin of our apple developer account, or use the admin account to login. Once you have the admin privilege.Once you have admin privilege , you would need to sign in and 

#### Creating an iOS Distribution Certificate


* Click on “Certificates Identifiers and Profiles” and then on the next screen click on “Certificates.”
* Click on the “+” button on the certificates page and scroll down in the production section and choose the “App Store and Ad Hoc” option and click “Continue”.
![Creating IoS distribution cert](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-1.png)

* Since we are creating a new certificate, you need to open > Keychain Access from your mac .The easiest way to do this is in your Mac click on the search bar in the top right and search for “Keychain Access” and open this application, Click on Keychain Access in the menu in the top left, and in the dropdown hover over “Certificate Assistant” and choose “Request a Certificate From a Certificate Authority”.

![Key Chain](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-2.png)

* This will open up a modal which you can then fill out the e-mail address with your developer account e-mail and then a common name which can usually just be the same of your organisation. After you have filled these out choose the “Save to disk” option and save the certificate to wherever you want on your computer.

![Certificate of Authority](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-3.png)

* After we do this back in our developer account we will click “Continue” again and on the next page we will upload the CSR file we just created and saved to our computer. Attach the file via the “Choose file…” button, attach the file and click the “Generate” button.

![IOS certificate](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-4.png)

* In the next screen you will be able to download the generated file (which is an iOS distribution .cer file) by clicking on the “Download” button. Download this file and save it somewhere on your computer (probably the “Downloads” folder).

![IOS File](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-5.png)

* After this, we need to again open up the “Keychain Access” application and we need to drag and drop this certificate into the section in the top left of the “Keychain Access” window called “logins.” Note that this information is also present on the download screen we were just at in the Developer Center.

That is all that we need to do for creating an iOS Distribution Certificate. This tutorial is taken from [9bitstudio](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/) . You can refer [9bitstudios](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/) for better explanation

#### Creating an App ID in Developer Center

Once you have created an IOS Distribution Cert, what comes next is App ID .  The App ID is a unique identifier key that the App Store will use to differentiate it from other apps. Example, on our app store we have ticktrade and many more mobile apps. Each and every one of this apps have a unique Id or identifier on the store . This identifier is created once and this have been created for next-gen . You don't need to create another one.

#### Creating an iOS Provisioning Profile in Developer Center

provisioning profile is very important in IOS submission without which an ipa cannot be submitted to the store. 

You may not need to recreate this step for one has been created. You need to download a the existing provision profile though or where not available , create one as detailed below.

* Back in the developer center, Under the “Provisioning Profiles” section in the “Certificates, Identifiers & Profiles” screen click on “Distribution.” Click on the “+” button to create a new provisioning profile. In the next section scroll down and choose “App Store” to create a distribution provisioning profile to submit your app to the App Store and click on “Continue”.

![Provisioning prof 1](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-6.png)

* Next you can create a name for the profile. You can put whatever you want in here, the name of your organization or the name of your application.

![Prov prof 2](http://www.9bitstudios.com/wp-content/uploads/iOS-submission-7.png)

* After you have chosen something click on the “Generate” button. This will take you to a screen where you can download your iOS Provisioning Profile. Download this .mobileprovision file and save it somewhere on your computer.
* Now go to the location where you downloaded this provisioning profile. Double click on it and choose the “Add to Library” option to add this profile to the iPhone configuration utility.

Note:  This tut is taken from [9bitstudios](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/)

#### Configuring & Packaging Project in Xcode

After going through the above stages, its time to configure and package your .ipa in xcode. There is a clear detail on how this on [9bit studios](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/). To summarised the steps,

* Adding a distribution configuration under the project tab.
* Setting code signing identity for both project and deployment target.
* Select the Target > General tab > Deployment Info. Check Hide status bar, Requires fullscreen . For device orientations , select Portrait, upside down for universal and iphone devices. Select all the four options for ipad device .
* Select 'Generic IOS Device' as your destination. And then finally.
* Select Product from the Menu > Then 'Archive' .

A more detailed explanation of this step with shots is available at [9bitstudios](http://www.9bitstudios.com/2016/01/submit-apache-cordova-applications-for-ios-and-android-to-the-apple-app-store-google-play/)

Note: You would be prompted with message asking if you want to sign using your key. Select the right key and click ok.   

## Build new desktop app version

We use [Electron](http://electron.atom.io/) to run as desktop app.

`
npm i electron-prebuilt -g
brew install gnu-tar libicns graphicsmagick
electron
`

Note: To build new windows installer on MAC you must have mono, wine installed using the commands below.

`brew install wine --without-x11
brew install mono`

Note: To build new linux installer on MAC you must have gnu-tar, libicns, graphicsmagick, xz installed. Please run the command below.

`brew install gnu-tar libicns graphicsmagick xz`

For better explanation , please refer [here](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build)

### Build .dmg and squirrel windows installer

After you prepare your machine from the explanation above, its time to build the windows, linux and mac installers. to achieve this, simply run

`npm run dist `

The above command generate the desired .dmg , .exe etc in their respective folders. Check inside the dist folder and you would have access to these files. Alternatively , you can run 

`npm run all ` which generate the electron releases and the mobile builds. 
