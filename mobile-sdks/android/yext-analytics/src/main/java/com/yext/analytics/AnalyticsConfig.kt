package com.yext.analytics

/**
 * The main configuration options for Yext Analytics Events.
 */
data class AnalyticsConfig(
    /**
     * Used for specifying if an API Key or Bearer Token is used for the authorization property.
     */
    val authorizationType: AuthorizationType,
    
    /**
     * The API Key, OAuth, or bearer token for accessing the Analytics Events API.
     */
    val authorization: String,
    
    /**
     * The Yext environment to send requests to. Defaults to 'PRODUCTION'.
     */
    val environment: Environment = Environment.PRODUCTION,
    
    /**
     * The region to send requests to. Defaults to 'US'.
     */
    val region: Region = Region.US,
    
    /**
     * Whether to enable session tracking for analytics events.
     * Defaults to true. If set to false, sessionId will automatically be set to null in the event payload.
     */
    val sessionTrackingEnabled: Boolean = true,
    
    /**
     * Used to enable debug mode, which is false by default.
     * When enabled the SDK will not send requests to the Events API, but will log the request instead.
     */
    val debug: Boolean = false
) {
    init {
        require(authorization.isNotEmpty()) { "Authorization must be provided" }
    }
    
    enum class AuthorizationType {
        API_KEY,
        BEARER
    }
    
    enum class Environment {
        PRODUCTION,
        SANDBOX
    }
    
    enum class Region {
        US,
        EU
    }
}