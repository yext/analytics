import Foundation

/// Protocol defining the analytics event service interface
public protocol AnalyticsEventService {
    /// Creates a new analytics service with additional default payload values
    func with(_ payload: EventPayload) -> AnalyticsEventService
    
    /// Reports an analytics event
    func report(_ payload: EventPayload?) async throws -> String
}

/// Session management utility
class SessionManager {
    private static let sessionIdKey = "YextAnalyticsSessionId"
    private static let sessionStartTimeKey = "YextAnalyticsSessionStartTime"
    private static let sessionTimeoutInterval: TimeInterval = 30 * 60 // 30 minutes
    
    static func getOrCreateSessionId() -> String {
        let userDefaults = UserDefaults.standard
        let now = Date()
        
        if let existingSessionId = userDefaults.string(forKey: sessionIdKey),
           let sessionStartTime = userDefaults.object(forKey: sessionStartTimeKey) as? Date {
            
            // Check if session has expired
            if now.timeIntervalSince(sessionStartTime) < sessionTimeoutInterval {
                // Update session start time to extend session
                userDefaults.set(now, forKey: sessionStartTimeKey)
                return existingSessionId
            }
        }
        
        // Create new session
        let newSessionId = ULID.generate()
        userDefaults.set(newSessionId, forKey: sessionIdKey)
        userDefaults.set(now, forKey: sessionStartTimeKey)
        
        return newSessionId
    }
}

/// Simple ULID generator
struct ULID {
    private static let encoding = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
    
    static func generate() -> String {
        let timestamp = UInt64(Date().timeIntervalSince1970 * 1000)
        var ulid = ""
        
        // Encode timestamp (10 characters)
        var ts = timestamp
        for _ in 0..<10 {
            ulid = String(encoding[Int(ts % 32)]) + ulid
            ts /= 32
        }
        
        // Add randomness (16 characters)
        for _ in 0..<16 {
            let randomIndex = Int(arc4random_uniform(32))
            ulid += String(encoding[randomIndex])
        }
        
        return ulid
    }
}

/// Network manager for handling HTTP requests
class NetworkManager {
    static func setupRequestUrl(environment: AnalyticsConfig.Environment, region: AnalyticsConfig.Region) throws -> URL {
        let baseUrl: String
        
        switch (environment, region) {
        case (.production, .us):
            baseUrl = "https://analytics.yext.com/api/events"
        case (.production, .eu):
            baseUrl = "https://analytics.eu.yext.com/api/events"
        case (.sandbox, .us):
            baseUrl = "https://sandbox.analytics.yext.com/api/events"
        case (.sandbox, .eu):
            throw AnalyticsError.invalidConfiguration("Sandbox environment is not supported in EU region")
        }
        
        guard let url = URL(string: baseUrl) else {
            throw AnalyticsError.invalidConfiguration("Invalid URL configuration")
        }
        
        return url
    }
    
    static func sendEvent(to url: URL, payload: EventPayload, config: AnalyticsConfig) async throws -> String {
        if config.debug {
            printDebugLog(payload: payload, config: config)
            return "Debug mode - no request sent"
        }
        
        let jsonData = try JSONEncoder().encode(payload)
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = jsonData
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
                return String(data: data, encoding: .utf8) ?? ""
            } else {
                throw AnalyticsError.httpError(httpResponse.statusCode, String(data: data, encoding: .utf8))
            }
        }
        
        throw AnalyticsError.networkError("Unknown network error")
    }
    
    private static func printDebugLog(payload: EventPayload, config: AnalyticsConfig) {
        print("[DEBUG] AnalyticsConfig object at time of call to report():")
        print(config)
        print("[DEBUG] The following EventPayload would be sent to the Yext Events API:")
        print(payload)
    }
}

/// Analytics error types
public enum AnalyticsError: Error, LocalizedError {
    case invalidConfiguration(String)
    case networkError(String)
    case httpError(Int, String?)
    case encodingError(String)
    
    public var errorDescription: String? {
        switch self {
        case .invalidConfiguration(let message):
            return "Configuration error: \(message)"
        case .networkError(let message):
            return "Network error: \(message)"
        case .httpError(let code, let message):
            return "HTTP error \(code): \(message ?? "Unknown error")"
        case .encodingError(let message):
            return "Encoding error: \(message)"
        }
    }
}