import Foundation

/// Coordinates representing latitude and longitude
public struct Coordinates: Codable {
    public let latitude: Double
    public let longitude: Double
    
    public init(latitude: Double, longitude: Double) {
        self.latitude = latitude
        self.longitude = longitude
    }
}

/// The version label of the search config
public enum VersionLabel: String, Codable {
    case production = "PRODUCTION"
    case staging = "STAGING"
}

/// Browser agent information
public struct BrowserAgent: Codable {
    public let browser: String?
    public let browserVersion: String?
    public let device: String?
    public let deviceClass: String?
    public let os: String?
    public let osVersion: String?
    public let userAgent: String?
    
    public init(
        browser: String? = nil,
        browserVersion: String? = nil,
        device: String? = nil,
        deviceClass: String? = nil,
        os: String? = nil,
        osVersion: String? = nil,
        userAgent: String? = nil
    ) {
        self.browser = browser
        self.browserVersion = browserVersion
        self.device = device
        self.deviceClass = deviceClass
        self.os = os
        self.osVersion = osVersion
        self.userAgent = userAgent
    }
}

/// Chat-specific analytics fields
public struct ChatAnalytics: Codable {
    public let botId: String
    public let conversationId: String?
    public let responseId: String?
    
    public init(botId: String, conversationId: String? = nil, responseId: String? = nil) {
        self.botId = botId
        self.conversationId = conversationId
        self.responseId = responseId
    }
}

/// Pages-specific analytics fields
public struct PagesAnalytics: Codable {
    public let scope: String?
    public let originalEventName: String?
    public let siteUid: Int?
    public let template: String?
    
    public init(
        scope: String? = nil,
        originalEventName: String? = nil,
        siteUid: Int? = nil,
        template: String? = nil
    ) {
        self.scope = scope
        self.originalEventName = originalEventName
        self.siteUid = siteUid
        self.template = template
    }
}

/// Search-specific analytics fields
public struct SearchAnalytics: Codable {
    public let searchId: String?
    public let queryId: String?
    public let verticalKey: String?
    public let isDirectAnswer: Bool?
    public let versionLabel: VersionLabel?
    public let versionNumber: Int?
    public let experienceKey: String
    public let isGenerativeDirectAnswer: Bool?
    
    public init(
        experienceKey: String,
        searchId: String? = nil,
        queryId: String? = nil,
        verticalKey: String? = nil,
        isDirectAnswer: Bool? = nil,
        versionLabel: VersionLabel? = nil,
        versionNumber: Int? = nil,
        isGenerativeDirectAnswer: Bool? = nil
    ) {
        self.experienceKey = experienceKey
        self.searchId = searchId
        self.queryId = queryId
        self.verticalKey = verticalKey
        self.isDirectAnswer = isDirectAnswer
        self.versionLabel = versionLabel
        self.versionNumber = versionNumber
        self.isGenerativeDirectAnswer = isGenerativeDirectAnswer
    }
}

/// IP address information
public struct IPInfo: Codable {
    public let address: String
    public let algorithm: String
    
    public init(address: String, algorithm: String) {
        self.address = address
        self.algorithm = algorithm
    }
}

/// Monetary value information
public struct MonetaryValue: Codable {
    public let amount: Double
    public let currency: String
    
    public init(amount: Double, currency: String) {
        self.amount = amount
        self.currency = currency
    }
}