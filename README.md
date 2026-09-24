# Angular Atlas

Interactive Angular learning course packaged as a web app and Android app with Capacitor.

## Web app

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Android APK

Prerequisites:

- Android Studio
- Android SDK
- JDK 21 or the JDK version supported by the installed Android Gradle Plugin

Build and sync the Android project:

```bash
npm run mobile:build
```

Open the native project in Android Studio:

```bash
npx cap open android
```

From Android Studio, select a device or emulator and press Run. To create an installable debug APK, use **Build > Generate App Bundles or APKs > Generate APKs**. The debug APK will be under:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

After changing Angular code, run `npm run mobile:build` again before running the Android app so the latest lessons are copied into the native project.

## Natural lesson audio

Lesson audio is generated with the `edge-tts.js` Node package using Microsoft Edge neural voices. It needs an internet connection only while generating files; no API key, backend, or running voice service is required. Generated MP3 files are stored in `public/audio` and played as static lesson audio.

```sh
npm run generate:audio
```

The default voice is `en-US-EmmaMultilingualNeural`. Choose a different voice or pace when generating:

```sh
EDGE_TTS_VOICE=en-US-AndrewMultilingualNeural EDGE_TTS_RATE=-8% npm run generate:audio
```
