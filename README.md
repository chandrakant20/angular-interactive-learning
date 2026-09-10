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

## Neural lesson audio

The detailed core lessons include generated Piper neural voice audio in `public/audio`. The app plays those WAV files first and falls back to the browser voice for sections without an audio asset.

To regenerate the audio on a Mac:

```bash
python3 -m venv .tts-env
.tts-env/bin/python -m pip install piper-tts
mkdir -p .tools/piper-voices
.tts-env/bin/python -m piper.download_voices --download-dir .tools/piper-voices en_US-lessac-medium
npm run generate:audio
```
