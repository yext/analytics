# Yext Analytics Android SDK

A Kotlin library for sending Yext Analytics events from Android applications.

## Installation

### Gradle

Add the following to your app's `build.gradle` file:

```kotlin
dependencies {
    implementation 'com.yext:analytics-android:1.0.0'
}
```

### Maven

Add the following to your `pom.xml`:

```xml
<dependency>
    <groupId>com.yext</groupId>
    <artifactId>analytics-android</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Getting Started

### Initialize Analytics Reporter

```kotlin
import com.yext.analytics.*

// Root analytics service with no defaults
val config = AnalyticsConfig(
    authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
    authorization = "YOUR_API_KEY"
)

val rootAnalytics = YextAnalytics.analytics(config, context)
```

### Set Default Values

You can add default values to avoid repeatedly specifying the same properties:

```kotlin
// Pages analytics service with Pages defaults
val pagesPayload = EventPayload(pages = PagesAnalytics(siteUid = 123))
val pageAnalytics = rootAnalytics.with(pagesPayload)

// Chat analytics service with both Chat and Pages defaults
val chatPayload = EventPayload(chat = ChatAnalytics(botId = "my-bot"))
val chatAnalytics = pageAnalytics.with(chatPayload)
```

### Fire an Event

```kotlin
lifecycleScope.launch {
    try {
        val payload = EventPayload(action = Action.ChatImpression)
        val result = chatAnalytics.report(payload)
        Log.d("Analytics", "Event sent successfully: $result")
    } catch (e: AnalyticsException) {
        Log.e("Analytics", "Failed to send event", e)
    }
}
```

## Configuration Options

### AnalyticsConfig

- `authorizationType`: Either `API_KEY` or `BEARER`
- `authorization`: Your API key or bearer token
- `environment`: `PRODUCTION` (default) or `SANDBOX`
- `region`: `US` (default) or `EU`
- `sessionTrackingEnabled`: `true` (default) or `false`
- `debug`: `false` (default) or `true`

### Debug Mode

Enable debug mode to prevent real requests and log payloads instead:

```kotlin
val config = AnalyticsConfig(
    authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
    authorization = "YOUR_API_KEY",
    debug = true
)
```

## Event Types

### Predefined Actions

The SDK includes all standard Yext Analytics actions:

```kotlin
val payload = EventPayload(action = Action.PageView)
val payload2 = EventPayload(action = Action.CtaClick)
val payload3 = EventPayload(action = Action.ThumbsUp)
```

### Custom Actions

Create custom actions with the `C_` prefix:

```kotlin
val customPayload = EventPayload(action = Action.Custom("MY_CUSTOM_EVENT"))
// This sends action as "C_MY_CUSTOM_EVENT"
```

### Conversion Events

Send conversion events with monetary values:

```kotlin
val conversionPayload = EventPayload(
    action = Action.Custom("CONVERSION_EVENT"),
    value = MonetaryValue(amount = 10.0, currency = "USD")
)
```

## Analytics Event Types

### Chat Analytics

```kotlin
val chatPayload = EventPayload(
    action = Action.ChatImpression,
    chat = ChatAnalytics(
        botId = "my-bot",
        conversationId = "conv-123",
        responseId = "resp-456"
    )
)
```

### Pages Analytics

```kotlin
val pagesPayload = EventPayload(
    action = Action.PageView,
    pages = PagesAnalytics(
        siteUid = 123,
        template = "location"
    )
)
```

### Search Analytics

```kotlin
val searchPayload = EventPayload(
    action = Action.QuestionSubmit,
    search = SearchAnalytics(
        experienceKey = "my-search",
        searchId = "search-123",
        queryId = "query-456"
    ),
    searchTerm = "coffee near me"
)
```

## Custom Properties

### Custom Tags (String Values)

```kotlin
val payload = EventPayload(
    action = Action.Custom("ORDER"),
    customTags = mapOf(
        "promoCode" to "SPRING15OFF",
        "orderType" to "delivery"
    )
)
```

### Custom Values (Numeric Values)

```kotlin
val payload = EventPayload(
    action = Action.Custom("ORDER"),
    customValues = mapOf(
        "promoDiscount" to 5.25,
        "itemCount" to 3.0
    )
)
```

## Session Tracking

Session tracking is enabled by default and uses a ULID to tie together events in a single session. You can disable it or provide your own session ID:

```kotlin
// Disable session tracking
val config = AnalyticsConfig(
    authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
    authorization = "YOUR_API_KEY",
    sessionTrackingEnabled = false
)

// Or provide your own session ID
val payload = EventPayload(
    action = Action.PageView,
    sessionId = "my-custom-session-id"
)
```

## Error Handling

The SDK provides detailed error information:

```kotlin
lifecycleScope.launch {
    try {
        val result = analytics.report(payload)
    } catch (e: AnalyticsException.InvalidConfiguration) {
        Log.e("Analytics", "Configuration error: ${e.message}")
    } catch (e: AnalyticsException.NetworkError) {
        Log.e("Analytics", "Network error: ${e.message}")
    } catch (e: AnalyticsException.HttpError) {
        Log.e("Analytics", "HTTP error ${e.code}: ${e.body}")
    } catch (e: Exception) {
        Log.e("Analytics", "Unknown error", e)
    }
}
```

## Permissions

Add the following permission to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## ProGuard Rules

If you're using ProGuard, add the following rules to your `proguard-rules.pro`:

```
# Yext Analytics
-keep class com.yext.analytics.** { *; }
-keepclassmembers class com.yext.analytics.** { *; }

# Gson
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keep class com.google.gson.** { *; }
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer
```

## Requirements

- Android API level 21 (Android 5.0) or higher
- Kotlin 1.7.0 or higher

## Dependencies

- Kotlin Coroutines
- OkHttp 4.12.0
- Gson 2.10.1
- AndroidX Core KTX

## License

Yext Analytics Android SDK is licensed under the [BSD-3 License](../../../LICENSE).
