# Gap Mesh: Communication Beyond Borders

Gap Mesh is a decentralized, private, and free communication platform designed for resilience in hostile environments. It enables unstoppable peer-to-peer messaging through an offline mesh network and global location-based channels.

## 🌟 Core Features

- **Offline Mesh Network**: Direct Bluetooth and Wi-Fi peer-to-peer communication. Message anyone within range—no internet required.
- **Global Location Channels**: Connect with people in your geographic area using Tor and Nostr relays when online.
- **Privacy-First & Encrypted**: End-to-End Encryption (E2EE) using the Noise Protocol. No accounts, phone numbers, or metadata tracking.

## 🛡️ Advanced Capabilities

- **Hardware Security**: Cryptographic keys are stored in the Secure Enclave (iOS) or StrongBox (Android).
- **Panic Wipe & Decoy Mode**: A hardware-backed emergency wipe system destroys all keys instantly. Decoy mode provides plausible deniability.
- **App Disguise**: Camouflage Gap Mesh as a calculator or weather app to bypass physical inspection.
- **Tor Routing**: All online traffic is routed through the Tor anonymity network for absolute metadata protection.
- **Offline App Sharing**: Android users can share the app binary directly with nearby users without any internet connection.
- **Rich Media & Commands**: Send encrypted images and voice notes; use IRC-style slash commands for advanced control.

## 📱 Mobile Applications

| Platform    | Status    | Links                                                                                                                                                                                          |
| :---------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **iOS**     | Available | [App Store](https://apps.apple.com/us/app/gap-mesh/id6757211522) • [TestFlight Beta](https://testflight.apple.com/join/Vgbv1MTy) • [Source Code](https://github.com/darabo/gapmesh-ios)        |
| **Android** | Beta      | [Join Android Beta](https://groups.google.com/g/gap-mesh-android) • [Download APK](https://github.com/darabo/gap-android/releases) • [Source Code](https://github.com/darabo/gap-android-main) |

## 💻 Tech Stack (Website)

The Gap Mesh website is built for speed and privacy, optimized for users in restricted network environments.

- **Frontend**: React 19, Vite, Tailwind CSS
- **Animations**: GSAP 3 with ScrollTrigger
- **i18n**: Support for English and Farsi (RTL)
- **Optimizations**: Manual chunk splitting, responsive image loading, and aggressive bundle size reduction to ensure fast load times on slow 2G/3G connections.

## 📄 License

This project is licensed under the GPL-3.0 License. See the [LICENSE](LICENSE) file for details.
