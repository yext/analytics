# Yext Analytics

<div>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
  <a href='https://coveralls.io/github/yext/analytics?branch=main'>
    <img src='https://coveralls.io/repos/github/yext/analytics/badge.svg?branch=main' alt='Coverage Status' />
  </a>
</div>
<br>

A Typescript library for sending Yext Analytics events.

[Full Documentation](./docs/analytics.md)

# Yext Analytics

Yext Analytics is a multi-platform library for sending analytics events that occur on your digital experiences to the Yext Analytics platform. You can record user actions that we offer out-of-the-box, such as page views and clicks, or custom actions that are unique to your business! Yext uses the same analytics reporting features across Search, Pages, and Chat so these products all use one interface.

## Platform Support

- **Web (Browser)**: TypeScript/JavaScript SDK with CommonJS and ES6 support
- **iOS**: Native Swift SDK with Swift Package Manager support
- **Android**: Native Kotlin SDK with Gradle support

All SDKs provide identical functionality and API compatibility across platforms.

### Web SDK Features

- Works in the **browser** only.
- 100% **TypeScript**, with detailed analytics event models
- Compatible with both **CommonJS** and **ES6** imports

### Mobile SDK Features

- **iOS**: Swift 5.5+, iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+
- **Android**: Kotlin, Android API 21+ (Android 5.0+)
- Native networking and session management
- Platform-optimized device detection

## Getting Started

### Web SDK (TypeScript/JavaScript)

First, install the library via [npm](https://www.npmjs.com/get-npm):

```bash
npm install @yext/analytics
```

### Mobile SDKs

For mobile applications, use the native SDKs:

#### iOS (Swift)

```swift
// Swift Package Manager
dependencies: [
    .package(url: "https://github.com/yext/analytics", from: "1.0.0")
]
```

#### Android (Kotlin)

```kotlin
dependencies {
    implementation 'com.yext:analytics-android:1.0.0'
}
```

For detailed mobile SDK documentation, see the [Mobile SDKs README](mobile-sdks/README.md).

### Initialize Analytics Reporter

#### Web (TypeScript/JavaScript)

Next, import and initialize the library in your application. When initializing your analytics reporter, you only need to provide an API Key that has access to the Events API. Other attributes such as your business ID will be automatically inferred. You can acquire this API key in the developer console of the Yext Platform.

```ts
import { analytics } from '@yext/analytics';

// Root analytics service with no defaults.
const rootAnalytics = analytics({
  authorizationType: 'apiKey',
  authorization: 'MY_API_KEY'
});
```

#### iOS (Swift)

```swift
import YextAnalytics

let config = AnalyticsConfig(
    authorizationType: .apiKey,
    authorization: "MY_API_KEY"
)

let rootAnalytics = try analytics(config: config)
```

#### Android (Kotlin)

```kotlin
import com.yext.analytics.*

val config = AnalyticsConfig(
    authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
    authorization = "MY_API_KEY"
)

val rootAnalytics = YextAnalytics.analytics(config, context)
```

In many cases, you might need to repeatedly specify the same properties, such as a Pages site ID or Chat bot ID. Yext Analytics allows you to avoid having to repeatedly specify the same code by allowing you to set **default values**.

You can add a `.with()` method to the root analytics service you initialized, which returns a new analytics object with the specified JSON merged on top of the existing defaults.

#### Web (TypeScript/JavaScript)

```ts
import { analytics } from '@yext/analytics';

// Root analytics service with no defaults.
const rootAnalytics = analytics({
  authorizationType: 'apiKey',
  authorization: 'MY_API_KEY'
});

// Pages analytics service with Pages defaults.
const pageAnalytics = rootAnalytics.with({ pages: { siteId: 123 } });

// Chat analytics service with both Chat **and** Pages defaults.
const chatAnalytics = pageAnalytics.with({ chat: { botId: 'my-bot' } });
```

#### iOS (Swift)

```swift
// Pages analytics service with Pages defaults
let pagesPayload = EventPayload(pages: PagesAnalytics(siteUid: 123))
let pageAnalytics = rootAnalytics.with(pagesPayload)

// Chat analytics service with both Chat and Pages defaults
let chatPayload = EventPayload(chat: ChatAnalytics(botId: "my-bot"))
let chatAnalytics = pageAnalytics.with(chatPayload)
```

#### Android (Kotlin)

```kotlin
// Pages analytics service with Pages defaults
val pagesPayload = EventPayload(pages = PagesAnalytics(siteUid = 123))
val pageAnalytics = rootAnalytics.with(pagesPayload)

// Chat analytics service with both Chat and Pages defaults
val chatPayload = EventPayload(chat = ChatAnalytics(botId = "my-bot"))
val chatAnalytics = pageAnalytics.with(chatPayload)
```

Calling `pageAnalytics.report()` sends an event with the `pages` object, plus anything passed to `report`. Calling `chatAnalytics.report()` sends an event with both the `pages` and `chat` objects, plus anything passed to `report`. You can override the default values defined in the .with() method by sending them along with the event.

For other configuration features, see [AnalyticsConfig.ts](/docs/analytics.analyticsconfig.md)

### Fire an Event

Now that we’ve initialized our analytics reporter, we can fire an event! This sends a `CHAT_IMPRESSION` event type, along with a `sessionId`, a `pages.siteId`, and a `chat.botId`.

```ts
chatAnalytics.report({
  action: 'CHAT_IMPRESSION'
});
```

#### iOS (Swift)

```swift
Task {
    let payload = EventPayload(action: .chatImpression)
    try await chatAnalytics.report(payload)
}
```

#### Android (Kotlin)

```kotlin
lifecycleScope.launch {
    val payload = EventPayload(action = Action.ChatImpression)
    chatAnalytics.report(payload)
}
```

### Additional Configuration

#### Session Tracking

Session tracking is now available for Chat, Pages, and Search. Yext uses a browser-based method (sessionStorage) to track this. By default, session tracking is **enabled** in **both** the US and EU environments. This can be disabled by setting `sessionTrackingEnabled` to `false`.

When `sessionTrackingEnabled` is set to `true`, Analytics will automatically generate a ULID for `sessionId` and bind that ULID to events from the same browser session. Users may also provide their own `sessionId`, which takes precedence over the auto-generated ID by Analytics. [To read more about how we generate ULIDs, check out ulidx.](https://github.com/perry-mitchell/ulidx)

#### Custom Events

You can also send custom analytics events.

```ts
pagesAnalytics.report({
  action: 'C_MY_CUSTOM_EVENT'
});
```

Additionally, you can send arbitrary conversion events by specifying a `value` JSON object with a dollar `amount` and a `currency` in ISO format.

```ts
chatAnalytics.report({
  action: 'C_CONVERSION_EVENT',
  value: {
    amount: 10,
    currency: 'USD'
  }
});
```

To learn more about sending conversion events, see our [API documentation](https://hitchhikers.yext.com/docs/eventsapis/events/events#operation/sendEvents).

#### Custom Properties

You can attach custom properties to your analytics events by specifying either `customTags` or `customValues` with your request. `customTags` represent up to ten **string** key-value pairs and `customValues` represent up to ten **numeric** key-value pairs.

For example, if I set up an `ORDER` event for my restaurant and wanted to track whether a promotional code was used on the order, I could add an `promoCode` custom tag to the event.

```ts
pagesAnalytics.report({
  action: 'C_CONVERSION_EVENT',
  sessionId: 'e790f75d-4f1e-4a1b-b57b-9a456019b176',
  value: {
    amount: 35.5,
    currency: 'USD'
  },
  customTags: {
    promoCode: 'SPRING15OFF'
  }
});
```

Additionally, if I wanted to record the discount amount of the promotion, I could add a `promoDiscount` custom value to the `ORDER` event.

```ts
pagesAnalytics.report({
  action: 'C_CONVERSION_EVENT',
  sessionId: 'e790f75d-4f1e-4a1b-b57b-9a456019b176',
  value: {
    amount: 35.5,
    currency: 'USD'
  },
  customTags: {
    promoCode: 'SPRING15OFF'
  },
  customValues: {
    promoDiscount: 41.76
  }
});
```

### Debugging

#### Debug Mode

The SDK has a debug mode which can be activated by setting the `debug` property in your AnalyticsConfig to `true`.
This will prevent `report()` from sending a real request to the Yext Events API. Instead it will print the EventPayload and AnalyticsConfig to console.

#### fetch + keepalive

We use `fetch()` + `keepalive` by default in [supported browsers](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to make debugging easier. For browsers like Firefox that do not support `keepalive`, [we use the Beacon API](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API). Users can set `forceFetch: true` in their config, which will make these browsers use `fetch()` instead of the `Beacon API`. Be warned, since `forceFetch` uses `fetch()` without `keepalive`, **requests in progress for browsers like FireFox will be canceled if the page is unloaded**.

## Module support

### Web SDK

- The ESM (ES6) build will be used automatically by module bundlers that support it (e.g. Webpack). It can be specified directly by importing `@yext/analytics/lib/esm`
- The CommonJS build will be used automatically by Node, but it can be specified directly by importing `@yext/analytics/lib/commonjs`

### Mobile SDKs

- **iOS**: Swift Package Manager support with SPM manifest and module maps
- **Android**: Gradle library with AAR distribution and Maven publishing

## License

Yext Analytics is an open-sourced library licensed under the [BSD-3 License](./LICENSE).

## Third Party Licenses

The licenses of our 3rd party dependencies are collected here: [THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES).
