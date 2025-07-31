import Foundation

/// Main analytics event reporter implementing the AnalyticsEventService protocol
public class AnalyticsEventReporter: AnalyticsEventService {
    private let config: AnalyticsConfig
    private let defaultPayload: EventPayload?
    
    /// Initialize the analytics reporter with configuration
    public init(config: AnalyticsConfig, defaultPayload: EventPayload? = nil) throws {
        // Validate configuration
        guard !config.authorization.isEmpty else {
            throw AnalyticsError.invalidConfiguration("Authorization must be provided")
        }
        
        self.config = config
        self.defaultPayload = defaultPayload
    }
    
    /// Create a new analytics service with additional default payload values
    public func with(_ payload: EventPayload) -> AnalyticsEventService {
        let mergedPayload = merge(base: defaultPayload, new: payload)
        return try! AnalyticsEventReporter(config: config, defaultPayload: mergedPayload)
    }
    
    /// Report an analytics event
    public func report(_ newPayload: EventPayload? = nil) async throws -> String {
        var finalPayload = merge(base: defaultPayload, new: newPayload)
        
        // Handle session tracking
        if !config.sessionTrackingEnabled {
            finalPayload.sessionId = nil
        } else if finalPayload.sessionId == nil {
            finalPayload.sessionId = SessionManager.getOrCreateSessionId()
        }
        
        // Add client SDK version
        let version = getSDKVersion()
        if finalPayload.clientSdk == nil {
            finalPayload.clientSdk = [:]
        }
        finalPayload.clientSdk?["ANALYTICS"] = version
        
        // Set authorization
        finalPayload.authorization = config.authorizationType == .apiKey
            ? "KEY \(config.authorization)"
            : "Bearer \(config.authorization)"
        
        // Get device information if not provided
        if finalPayload.browserAgent == nil {
            finalPayload.browserAgent = getDeviceInfo()
        }
        
        // Setup request URL
        let url = try NetworkManager.setupRequestUrl(environment: config.environment, region: config.region)
        
        // Send the event
        return try await NetworkManager.sendEvent(to: url, payload: finalPayload, config: config)
    }
    
    /// Merge two event payloads, with new payload taking precedence
    private func merge(base: EventPayload?, new: EventPayload?) -> EventPayload {
        guard let base = base else { return new ?? EventPayload() }
        guard let new = new else { return base }
        
        var merged = base
        
        // Merge all properties, with new taking precedence over base
        if new.action != nil { merged.action = new.action }
        if new.authorization != nil { merged.authorization = new.authorization }
        if new.bot != nil { merged.bot = new.bot }
        if new.browserAgent != nil { merged.browserAgent = new.browserAgent }
        if new.chat != nil { merged.chat = new.chat }
        if new.clientSdk != nil { merged.clientSdk = mergeStringDictionaries(base.clientSdk, new.clientSdk) }
        if new.count != nil { merged.count = new.count }
        if new.customTags != nil { merged.customTags = mergeStringDictionaries(base.customTags, new.customTags) }
        if new.customValues != nil { merged.customValues = mergeNumberDictionaries(base.customValues, new.customValues) }
        if new.destinationUrl != nil { merged.destinationUrl = new.destinationUrl }
        if new.entity != nil { merged.entity = new.entity }
        if new.internalUser != nil { merged.internalUser = new.internalUser }
        if new.ip != nil { merged.ip = new.ip }
        if new.label != nil { merged.label = new.label }
        if new.locale != nil { merged.locale = new.locale }
        if new.location != nil { merged.location = new.location }
        if new.pages != nil { merged.pages = new.pages }
        if new.pageUrl != nil { merged.pageUrl = new.pageUrl }
        if new.referrerUrl != nil { merged.referrerUrl = new.referrerUrl }
        if new.search != nil { merged.search = new.search }
        if new.searchTerm != nil { merged.searchTerm = new.searchTerm }
        if new.sessionId != nil { merged.sessionId = new.sessionId }
        if new.timestamp != nil { merged.timestamp = new.timestamp }
        if new.value != nil { merged.value = new.value }
        if new.visitor != nil { merged.visitor = mergeStringDictionaries(base.visitor, new.visitor) }
        
        return merged
    }
    
    private func mergeStringDictionaries(_ base: [String: String]?, _ new: [String: String]?) -> [String: String]? {
        guard let base = base else { return new }
        guard let new = new else { return base }
        return base.merging(new) { _, new in new }
    }
    
    private func mergeNumberDictionaries(_ base: [String: Double]?, _ new: [String: Double]?) -> [String: Double]? {
        guard let base = base else { return new }
        guard let new = new else { return base }
        return base.merging(new) { _, new in new }
    }
    
    private func getSDKVersion() -> String {
        return "1.0.0" // This should be read from the package info in a real implementation
    }
    
    private func getDeviceInfo() -> BrowserAgent {
        let device = UIDevice.current
        let osVersion = device.systemVersion
        let deviceModel = getDeviceModel()
        
        return BrowserAgent(
            browser: "Mobile App",
            browserVersion: getSDKVersion(),
            device: deviceModel,
            deviceClass: getDeviceClass(),
            os: "iOS",
            osVersion: osVersion,
            userAgent: "YextAnalytics iOS SDK \(getSDKVersion())"
        )
    }
    
    private func getDeviceModel() -> String {
        var systemInfo = utsname()
        uname(&systemInfo)
        let machineMirror = Mirror(reflecting: systemInfo.machine)
        let identifier = machineMirror.children.reduce("") { identifier, element in
            guard let value = element.value as? Int8, value != 0 else { return identifier }
            return identifier + String(UnicodeScalar(UInt8(value))!)
        }
        return identifier
    }
    
    private func getDeviceClass() -> String {
        switch UIDevice.current.userInterfaceIdiom {
        case .phone:
            return "phone"
        case .pad:
            return "tablet"
        case .tv:
            return "tv"
        case .carPlay:
            return "car"
        case .mac:
            return "desktop"
        case .vision:
            return "headset"
        default:
            return "unknown"
        }
    }
}

#if canImport(UIKit)
import UIKit
#endif