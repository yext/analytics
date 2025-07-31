import Foundation

/// Main entry point for the Yext Analytics Events SDK
/// Returns an AnalyticsEventService given an AnalyticsConfig
public func analytics(config: AnalyticsConfig) throws -> AnalyticsEventService {
    return try AnalyticsEventReporter(config: config)
}

// Export all public types
public typealias YextAnalyticsConfig = AnalyticsConfig
public typealias YextEventPayload = EventPayload
public typealias YextAction = Action
public typealias YextAnalyticsEventService = AnalyticsEventService
public typealias YextAnalyticsError = AnalyticsError