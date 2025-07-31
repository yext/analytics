import Foundation

/// The main configuration options for Yext Analytics Events.
public struct AnalyticsConfig {
    /// Used for specifying if an API Key or Bearer Token is used for the authorization property.
    public enum AuthorizationType: String {
        case apiKey = "apiKey"
        case bearer = "bearer"
    }
    
    /// The Yext environment to send requests to.
    public enum Environment: String {
        case production = "PRODUCTION"
        case sandbox = "SANDBOX"
    }
    
    /// The region to send requests to.
    public enum Region: String {
        case us = "US"
        case eu = "EU"
    }
    
    /// The authorization type (API Key or Bearer Token)
    public let authorizationType: AuthorizationType
    
    /// The API Key, OAuth, or bearer token for accessing the Analytics Events API
    public let authorization: String
    
    /// The Yext environment to send requests to. Defaults to 'PRODUCTION'
    public let environment: Environment
    
    /// The region to send requests to. Defaults to 'US'
    public let region: Region
    
    /// Whether to enable session tracking for analytics events.
    /// Defaults to true. If set to false, sessionId will automatically be set to nil in the event payload.
    public let sessionTrackingEnabled: Bool
    
    /// Used to enable debug mode, which is false by default.
    /// When enabled the SDK will not send requests to the Events API, but will log the request instead.
    public let debug: Bool
    
    public init(
        authorizationType: AuthorizationType,
        authorization: String,
        environment: Environment = .production,
        region: Region = .us,
        sessionTrackingEnabled: Bool = true,
        debug: Bool = false
    ) {
        self.authorizationType = authorizationType
        self.authorization = authorization
        self.environment = environment
        self.region = region
        self.sessionTrackingEnabled = sessionTrackingEnabled
        self.debug = debug
    }
}