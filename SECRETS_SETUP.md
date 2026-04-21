# CI/CD Secrets Setup Guide

This file documents every secret you need to configure in
GitHub → Settings → Secrets and variables → Actions.

---

## iOS Secrets

| Secret Name                    | How to get it                                                   |
|--------------------------------|-----------------------------------------------------------------|
| `ASC_KEY_ID`                   | App Store Connect → Users & Access → Keys                       |
| `ASC_ISSUER_ID`                | App Store Connect → Keys page (top of page)                     |
| `ASC_PRIVATE_KEY`              | Download the .p8 file, paste its contents as the secret         |
| `MATCH_GIT_URL`                | URL to your private certs repo (e.g. git@github.com:org/certs)  |
| `MATCH_GIT_AUTH`               | Base64 of "username:personal_access_token"                      |
| `MATCH_PASSWORD`               | Password used to encrypt the certs in Match                     |
| `MATCH_KEYCHAIN_PASSWORD`      | Any secure random password for the CI keychain                  |
| `FIREBASE_APP_ID_IOS`          | Firebase Console → Project → Your iOS App → App ID              |
| `FIREBASE_TOKEN`               | Run `firebase login:ci` locally to generate                     |

---

## Android Secrets

| Secret Name                    | How to get it                                                   |
|--------------------------------|-----------------------------------------------------------------|
| `ANDROID_KEYSTORE_BASE64`      | `base64 -i release.keystore` — paste the output               |
| `ANDROID_KEY_ALIAS`            | The alias you used when creating the keystore                   |
| `ANDROID_KEY_PASSWORD`         | The key password from keystore creation                         |
| `ANDROID_STORE_PASSWORD`       | The store password from keystore creation                       |
| `GOOGLE_PLAY_JSON_KEY`         | Google Play Console → Setup → API access → Service account JSON |
| `FIREBASE_APP_ID_ANDROID`      | Firebase Console → Project → Your Android App → App ID          |
| `FIREBASE_TOKEN`               | Same token as iOS (shared)                                      |

---

## Optional

| Secret Name                    | Purpose                             |
|--------------------------------|-------------------------------------|
| `SLACK_WEBHOOK`                | Slack Incoming Webhook URL          |
| `CODECOV_TOKEN`                | Codecov.io repo token               |

---

## Generating the Android Keystore (one-time setup)

```bash
keytool -genkey -v \
  -keystore android/app/release.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Then base64 encode it for the GitHub secret:
base64 -i android/app/release.keystore | pbcopy
```

## Setting up Fastlane Match (one-time setup)

```bash
# Create a new private repo for certificates, then:
bundle exec fastlane match init

# Generate certificates:
bundle exec fastlane match appstore
bundle exec fastlane match adhoc
```

---

## Branch Strategy

| Branch     | Triggers       | iOS Deploy         | Android Deploy     |
|------------|----------------|--------------------|--------------------|
| `develop`  | push           | Firebase (beta)    | Firebase (beta)    |
| `main`     | push           | TestFlight         | Play Store internal|
| Any PR     | pull_request   | CI checks only     | CI checks only     |
