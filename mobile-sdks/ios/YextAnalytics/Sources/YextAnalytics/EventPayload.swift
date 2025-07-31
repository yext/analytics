import Foundation

/// The payload accepted by the Analytics Events API.
public struct EventPayload: Codable {
    /// The user action which caused the event
    public var action: Action?
    
    /// The authorization token for the request
    public var authorization: String?
    
    /// Whether the event is the result of bot activity
    public var bot: Bool?
    
    /// Information about the visitor's device and browser
    public var browserAgent: BrowserAgent?
    
    /// Fields specific to reporting Chat Analytics Events
    public var chat: ChatAnalytics?
    
    /// For the Yext client SDKs involved in the event
    public var clientSdk: [String: String]?
    
    /// When the record summarizes multiple events, the number of events the record represents
    public var count: Int?
    
    /// Up to 10 pairs matching custom string keys to string values
    public var customTags: [String: String]?
    
    /// Up to 10 pairs matching custom string keys to number values
    public var customValues: [String: Double]?
    
    /// The URL of the page the event is directing the visitor to
    public var destinationUrl: String?
    
    /// The Yext entity to which the event corresponds
    public var entity: EntityIdentifier?
    
    /// Indicates whether the event is the result of internal activity
    public var internalUser: Bool?
    
    /// The IP address for the event
    public var ip: IPInfo?
    
    /// A label assigned to the event
    public var label: String?
    
    /// The locale of the user who generated the event
    public var locale: String?
    
    /// The location information of the visitor for the event
    public var location: LocationInfo?
    
    /// Fields specific to reporting Yext Pages Analytics Events
    public var pages: PagesAnalytics?
    
    /// The URL of the page where the event occurred
    public var pageUrl: String?
    
    /// The URL of the page which the visitor came from prior to the event
    public var referrerUrl: String?
    
    /// Fields specific to reporting Yext Search Analytics Events
    public var search: SearchAnalytics?
    
    /// The query entered by the user
    public var searchTerm: String?
    
    /// Unique identifier to tie together events in a single browsing session
    public var sessionId: String?
    
    /// The timestamp at which the event occurred
    public var timestamp: Date?
    
    /// The monetary value of the event
    public var value: MonetaryValue?
    
    /// Information used to associate analytics with a particular user
    public var visitor: [String: String]?
    
    public init(
        action: Action? = nil,
        authorization: String? = nil,
        bot: Bool? = nil,
        browserAgent: BrowserAgent? = nil,
        chat: ChatAnalytics? = nil,
        clientSdk: [String: String]? = nil,
        count: Int? = nil,
        customTags: [String: String]? = nil,
        customValues: [String: Double]? = nil,
        destinationUrl: String? = nil,
        entity: EntityIdentifier? = nil,
        internalUser: Bool? = nil,
        ip: IPInfo? = nil,
        label: String? = nil,
        locale: String? = nil,
        location: LocationInfo? = nil,
        pages: PagesAnalytics? = nil,
        pageUrl: String? = nil,
        referrerUrl: String? = nil,
        search: SearchAnalytics? = nil,
        searchTerm: String? = nil,
        sessionId: String? = nil,
        timestamp: Date? = nil,
        value: MonetaryValue? = nil,
        visitor: [String: String]? = nil
    ) {
        self.action = action
        self.authorization = authorization
        self.bot = bot
        self.browserAgent = browserAgent
        self.chat = chat
        self.clientSdk = clientSdk
        self.count = count
        self.customTags = customTags
        self.customValues = customValues
        self.destinationUrl = destinationUrl
        self.entity = entity
        self.internalUser = internalUser
        self.ip = ip
        self.label = label
        self.locale = locale
        self.location = location
        self.pages = pages
        self.pageUrl = pageUrl
        self.referrerUrl = referrerUrl
        self.search = search
        self.searchTerm = searchTerm
        self.sessionId = sessionId
        self.timestamp = timestamp
        self.value = value
        self.visitor = visitor
    }
}

/// Entity identifier can be either a string or integer
public enum EntityIdentifier: Codable {
    case string(String)
    case integer(Int)
    
    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let stringValue = try? container.decode(String.self) {
            self = .string(stringValue)
        } else if let intValue = try? container.decode(Int.self) {
            self = .integer(intValue)
        } else {
            throw DecodingError.typeMismatch(EntityIdentifier.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Expected String or Int"))
        }
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .string(let value):
            try container.encode(value)
        case .integer(let value):
            try container.encode(value)
        }
    }
}

/// Location information can be either coordinates or country code
public enum LocationInfo: Codable {
    case coordinates(Coordinates)
    case countryCode(String)
    
    public init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if let coordinates = try? container.decode(Coordinates.self) {
            self = .coordinates(coordinates)
        } else if let countryCode = try? container.decode(String.self) {
            self = .countryCode(countryCode)
        } else {
            throw DecodingError.typeMismatch(LocationInfo.self, DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Expected Coordinates or String"))
        }
    }
    
    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch self {
        case .coordinates(let coordinates):
            try container.encode(coordinates)
        case .countryCode(let countryCode):
            try container.encode(countryCode)
        }
    }
}