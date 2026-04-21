# React Native CI/CD Pipeline — Production Demo

A production-ready CI/CD setup for React Native apps using **GitHub Actions**, **Fastlane**, **Firebase App Distribution**, **TestFlight**, and **Google Play Store**.

This is a portfolio-ready implementation that demonstrates end-to-end automated delivery for both iOS and Android.

---

## Pipeline Overview

```
Code Push (main / develop)
        │
        ▼
┌───────────────────────────────────┐
│         CI Checks (Ubuntu)         │
│  ✓ ESLint   ✓ TypeScript          │
│  ✓ Jest     ✓ npm audit           │
│  ✓ Bundle size validation         │
└────────────┬──────────────────────┘
             │ on push only
    ┌─────────┴──────────┐
    ▼                    ▼
iOS Build (macOS)   Android Build (Ubuntu)
Fastlane Match      Keystore signing
    │                    │
develop branch:     develop branch:
  Firebase Dist.      Firebase Dist.
main branch:        main branch:
  TestFlight          Google Play (internal)
```

---

## Tech Stack

| Layer         | Tool                          |
|---------------|-------------------------------|
| CI Runner     | GitHub Actions                |
| Automation    | Fastlane 2.x                  |
| iOS Signing   | Fastlane Match (Git strategy) |
| iOS Beta      | Firebase App Distribution     |
| iOS Prod      | TestFlight → App Store        |
| Android Beta  | Firebase App Distribution     |
| Android Prod  | Google Play Store (AAB)       |
| Notifications | Slack Webhooks                |
| Coverage      | Codecov                       |

---

## Project Structure

```
RNPipelineDemo/
├── .github/
│   └── workflows/
│       └── ci-cd.yml           ← Main pipeline
├── fastlane/
│   ├── Fastfile                ← All build/deploy lanes
│   └── Appfile                 ← App identifiers
├── src/
│   ├── components/
│   ├── screens/
│   └── utils/
│       └── formatters.ts       ← Sample utilities
├── __tests__/
│   └── formatters.test.ts      ← Unit tests
├── android/
│   └── app/                    ← Gradle project
├── ios/                        ← Xcode project
├── Gemfile                     ← Fastlane dependencies
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── SECRETS_SETUP.md            ← How to configure secrets
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- Ruby 3.2+ (`rbenv` recommended)
- Xcode 15+ (macOS only, for iOS)
- Android Studio + JDK 17

### Install

```bash
# Clone the repo
git clone https://github.com/yourname/RNPipelineDemo.git
cd RNPipelineDemo

# Install JS dependencies
yarn install

# Install Fastlane
bundle install

# iOS: Install CocoaPods
cd ios && pod install && cd ..
```

### Run CI checks locally

```bash
yarn lint          # ESLint
yarn tsc           # TypeScript check
yarn test          # Jest unit tests
yarn test --coverage  # With coverage report
```

### Run Fastlane locally

```bash
# iOS beta (requires macOS + signing set up)
bundle exec fastlane ios beta

# Android beta
bundle exec fastlane android beta

# iOS release (TestFlight)
bundle exec fastlane ios release

# Android release (Play Store)
bundle exec fastlane android release
```

---

## Configuring Secrets

See [`SECRETS_SETUP.md`](./SECRETS_SETUP.md) for the full list of GitHub Secrets
to configure, including how to generate the Android keystore and set up Fastlane Match.

---

## Key CI/CD Concepts Demonstrated

### 1. Job Dependencies (`needs`)
Jobs run in parallel where possible, and `needs` enforces the right order:
- iOS and Android builds run in parallel after CI checks pass
- Neither build triggers if lint/tests fail

### 2. Branch-based Deployment
The `if` conditions in the workflow dispatch different lanes based on the branch:
- `develop` → Firebase App Distribution (QA testing)
- `main` → TestFlight / Google Play (beta users)

### 3. Secret Management
No credentials ever touch your code. Certificates live in an encrypted private Git repo (Match), keystore is base64-encoded, API keys come from GitHub Secrets environment variables.

### 4. Automatic Versioning
Build numbers are timestamp-based (`YYYYMMDDHHmm`), version names come from `package.json`. No manual version bumping needed.

### 5. Artifact Uploads
IPAs and APKs are uploaded as GitHub Actions artifacts even on failure, so you can debug builds.

---

## How to Adapt This for Your Project

1. Replace `RNPipelineDemo` and `com.yourcompany.rnpipelinedemo` with your app name and bundle ID throughout
2. Set up all secrets in GitHub (see SECRETS_SETUP.md)
3. Create your Fastlane Match certs repo and run `match init`
4. Generate your Android release keystore
5. Push to `develop` — watch the pipeline run

---

## What This Adds to Your Portfolio

- **End-to-end CI/CD**: shows you understand the full software delivery lifecycle
- **Multi-platform mobile**: iOS + Android automation in one pipeline
- **Security-conscious**: proper secret management, no credentials in code
- **Production patterns**: code signing, versioning, staged rollouts
- **Fastlane proficiency**: heavily used in mobile industry
- **GitHub Actions**: industry-standard CI platform

---

## License

MIT
