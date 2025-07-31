# Yext Analytics Mobile SDKs

This directory contains mobile SDKs for the Yext Analytics platform, providing native implementations for iOS and Android.

## Available SDKs

### iOS SDK (Swift)

- **Location**: `ios/YextAnalytics/`
- **Language**: Swift
- **Platforms**: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+
- **Package Manager**: Swift Package Manager
- **Documentation**: [iOS SDK README](ios/YextAnalytics/README.md)

### Android SDK (Kotlin)

- **Location**: `android/yext-analytics/`
- **Language**: Kotlin
- **Platform**: Android API 21+ (Android 5.0+)
- **Build System**: Gradle
- **Documentation**: [Android SDK README](android/yext-analytics/README.md)

## Features

Both mobile SDKs provide the same core functionality as the web TypeScript SDK:

- ✅ **Complete API Parity**: Same events, configurations, and payload structures
- ✅ **Session Tracking**: Automatic ULID-based session management
- ✅ **Debug Mode**: Local testing without sending real requests
- ✅ **Custom Events**: Support for custom actions and properties
- ✅ **Error Handling**: Comprehensive error types and handling
- ✅ **Native Networking**: Platform-optimized HTTP clients
- ✅ **Offline Storage**: Native session persistence
- ✅ **Device Information**: Automatic device and OS detection

## Quick Start

### iOS (Swift)

```swift
import YextAnalytics

let config = AnalyticsConfig(
    authorizationType: .apiKey,
    authorization: "YOUR_API_KEY"
)

let analytics = try analytics(config: config)

Task {
    let payload = EventPayload(action: .pageView)
    try await analytics.report(payload)
}
```

### Android (Kotlin)

```kotlin
import com.yext.analytics.*

val config = AnalyticsConfig(
    authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
    authorization = "YOUR_API_KEY"
)

val analytics = YextAnalytics.analytics(config, context)

lifecycleScope.launch {
    val payload = EventPayload(action = Action.PageView)
    analytics.report(payload)
}
```

## Installation

### iOS Installation

#### Swift Package Manager

Add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/yext/analytics", from: "1.0.0")
]
```

#### Xcode

1. File → Add Package Dependencies
2. Enter: `https://github.com/yext/analytics`
3. Select: `mobile-sdks/ios/YextAnalytics`

### Android Installation

#### Gradle

```kotlin
dependencies {
    implementation 'com.yext:analytics-android:1.0.0'
}
```

#### Maven

```xml
<dependency>
    <groupId>com.yext</groupId>
    <artifactId>analytics-android</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Architecture

Both SDKs follow the same architectural patterns:

### Core Components

- **AnalyticsConfig**: Configuration settings
- **EventPayload**: Event data structure
- **AnalyticsEventService**: Service interface
- **AnalyticsEventReporter**: Main implementation

### Platform-Specific Adaptations

#### iOS

- **Networking**: URLSession with async/await
- **Storage**: UserDefaults for session management
- **Device Info**: UIDevice and system APIs
- **Concurrency**: Swift Concurrency (async/await)

#### Android

- **Networking**: OkHttp with Coroutines
- **Storage**: SharedPreferences for session management
- **Device Info**: Build and Configuration APIs
- **Concurrency**: Kotlin Coroutines

## API Compatibility

The mobile SDKs maintain full API compatibility with the web SDK:

| Feature          | Web (TypeScript) | iOS (Swift) | Android (Kotlin) |
| ---------------- | ---------------- | ----------- | ---------------- |
| Configuration    | ✅               | ✅          | ✅               |
| Event Payloads   | ✅               | ✅          | ✅               |
| Session Tracking | ✅               | ✅          | ✅               |
| Custom Events    | ✅               | ✅          | ✅               |
| Debug Mode       | ✅               | ✅          | ✅               |
| Error Handling   | ✅               | ✅          | ✅               |
| Default Values   | ✅               | ✅          | ✅               |

## Testing

### iOS Testing

```bash
cd mobile-sdks/ios/YextAnalytics
swift test
```

### Android Testing

```bash
cd mobile-sdks/android/yext-analytics
./gradlew test
```

## Examples

See the individual SDK READMEs for comprehensive examples:

- [iOS Examples](ios/YextAnalytics/README.md#getting-started)
- [Android Examples](android/yext-analytics/README.md#getting-started)

## License

Both mobile SDKs are licensed under the [BSD-3 License](../LICENSE), same as the main TypeScript SDK.
