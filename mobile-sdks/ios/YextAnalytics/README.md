# Yext Analytics iOS SDK

A Swift library for sending Yext Analytics events from iOS, macOS, tvOS, and watchOS applications.

## Installation

### Swift Package Manager

Add the following to your `Package.swift` file:

```swift
dependencies: [
    .package(url: "https://github.com/yext/analytics", from: "1.0.0")
]
```

Or add it through Xcode:

1. File → Add Package Dependencies
2. Enter the repository URL: `https://github.com/yext/analytics`
3. Select the iOS SDK subfolder: `mobile-sdks/ios/YextAnalytics`

## Getting Started

### Initialize Analytics Reporter

```swift
import YextAnalytics

// Root analytics service with no defaults
let config = AnalyticsConfig(
    authorizationType: .apiKey,
    authorization: "YOUR_API_KEY"
)

let rootAnalytics = try analytics(config: config)
```

### Set Default Values

You can add default values to avoid repeatedly specifying the same properties:

```swift
// Pages analytics service with Pages defaults
let pagesPayload = EventPayload(pages: PagesAnalytics(siteUid: 123))
let pageAnalytics = rootAnalytics.with(pagesPayload)

// Chat analytics service with both Chat and Pages defaults
let chatPayload = EventPayload(chat: ChatAnalytics(botId: "my-bot"))
let chatAnalytics = pageAnalytics.with(chatPayload)
```

### Fire an Event

```swift
Task {
    do {
        let payload = EventPayload(action: .chatImpression)
        let result = try await chatAnalytics.report(payload)
        print("Event sent successfully: \(result)")
    } catch {
        print("Failed to send event: \(error)")
    }
}
```

## Configuration Options

### AnalyticsConfig

- `authorizationType`: Either `.apiKey` or `.bearer`
- `authorization`: Your API key or bearer token
- `environment`: `.production` (default) or `.sandbox`
- `region`: `.us` (default) or `.eu`
- `sessionTrackingEnabled`: `true` (default) or `false`
- `debug`: `false` (default) or `true`

### Debug Mode

Enable debug mode to prevent real requests and log payloads instead:

```swift
let config = AnalyticsConfig(
    authorizationType: .apiKey,
    authorization: "YOUR_API_KEY",
    debug: true
)
```

## Event Types

### Predefined Actions

The SDK includes all standard Yext Analytics actions:

```swift
let payload = EventPayload(action: .pageView)
let payload2 = EventPayload(action: .ctaClick)
let payload3 = EventPayload(action: .thumbsUp)
```

### Custom Actions

Create custom actions with the `C_` prefix:

```swift
let customPayload = EventPayload(action: .custom("MY_CUSTOM_EVENT"))
// This sends action as "C_MY_CUSTOM_EVENT"
```

### Conversion Events

Send conversion events with monetary values:

```swift
let conversionPayload = EventPayload(
    action: .custom("CONVERSION_EVENT"),
    value: MonetaryValue(amount: 10.0, currency: "USD")
)
```

## Analytics Event Types

### Chat Analytics

```swift
let chatPayload = EventPayload(
    action: .chatImpression,
    chat: ChatAnalytics(
        botId: "my-bot",
        conversationId: "conv-123",
        responseId: "resp-456"
    )
)
```

### Pages Analytics

```swift
let pagesPayload = EventPayload(
    action: .pageView,
    pages: PagesAnalytics(
        siteUid: 123,
        template: "location"
    )
)
```

### Search Analytics

```swift
let searchPayload = EventPayload(
    action: .questionSubmit,
    search: SearchAnalytics(
        experienceKey: "my-search",
        searchId: "search-123",
        queryId: "query-456"
    ),
    searchTerm: "coffee near me"
)
```

## Custom Properties

### Custom Tags (String Values)

```swift
let payload = EventPayload(
    action: .custom("ORDER"),
    customTags: [
        "promoCode": "SPRING15OFF",
        "orderType": "delivery"
    ]
)
```

### Custom Values (Numeric Values)

```swift
let payload = EventPayload(
    action: .custom("ORDER"),
    customValues: [
        "promoDiscount": 5.25,
        "itemCount": 3.0
    ]
)
```

## Session Tracking

Session tracking is enabled by default and uses a ULID to tie together events in a browsing session. You can disable it or provide your own session ID:

```swift
// Disable session tracking
let config = AnalyticsConfig(
    authorizationType: .apiKey,
    authorization: "YOUR_API_KEY",
    sessionTrackingEnabled: false
)

// Or provide your own session ID
let payload = EventPayload(
    action: .pageView,
    sessionId: "my-custom-session-id"
)
```

## Error Handling

The SDK provides detailed error information:

```swift
Task {
    do {
        let result = try await analytics.report(payload)
    } catch AnalyticsError.invalidConfiguration(let message) {
        print("Configuration error: \(message)")
    } catch AnalyticsError.networkError(let message) {
        print("Network error: \(message)")
    } catch AnalyticsError.httpError(let code, let message) {
        print("HTTP error \(code): \(message ?? "Unknown")")
    } catch {
        print("Unknown error: \(error)")
    }
}
```

## Requirements

- iOS 13.0+
- macOS 10.15+
- tvOS 13.0+
- watchOS 6.0+
- Swift 5.5+

## License

Yext Analytics iOS SDK is licensed under the [BSD-3 License](../../../LICENSE).
