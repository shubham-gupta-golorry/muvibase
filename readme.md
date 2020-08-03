# MUVIBASE

MuviBase is a simple react native app that lets you search and shortlist movies for watching later. It boasts a minimalistic and beautiful UI.

# Libraries used:

  - AsyncStorage
  - SnackBar
  - Animated Bottom Navigation
  - React Native Vector Icons
  - Axios - HTTP Client


### Installation

MuviBase requires [Node.js](https://nodejs.org/) and react native cli.

Install the dependencies

```sh
$ cd MuviBase
$ npm install
$ npx react-native start
```

For Debug Build

```sh
$ cd MuviBase
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ cd android
$ ./gradlew assembleDebug
```
You can find the output APK in android/app/build/outputs/apk/debug in the project directory.

License
----

MIT


**Free Software, Hell Yeah!**
