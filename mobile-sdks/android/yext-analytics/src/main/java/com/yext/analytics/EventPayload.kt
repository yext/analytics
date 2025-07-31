package com.yext.analytics

import java.util.Date

/**
 * The payload accepted by the Analytics Events API.
 */
data class EventPayload(
    /**
     * The user action which caused the event
     */
    var action: Action? = null,
    
    /**
     * The authorization token for the request
     */
    var authorization: String? = null,
    
    /**
     * Whether the event is the result of bot activity
     */
    var bot: Boolean? = null,
    
    /**
     * Information about the visitor's device and browser
     */
    var browserAgent: BrowserAgent? = null,
    
    /**
     * Fields specific to reporting Chat Analytics Events
     */
    var chat: ChatAnalytics? = null,
    
    /**
     * For the Yext client SDKs involved in the event
     */
    var clientSdk: MutableMap<String, String>? = null,
    
    /**
     * When the record summarizes multiple events, the number of events the record represents
     */
    var count: Int? = null,
    
    /**
     * Up to 10 pairs matching custom string keys to string values
     */
    var customTags: Map<String, String>? = null,
    
    /**
     * Up to 10 pairs matching custom string keys to number values
     */
    var customValues: Map<String, Double>? = null,
    
    /**
     * The URL of the page the event is directing the visitor to
     */
    var destinationUrl: String? = null,
    
    /**
     * The Yext entity to which the event corresponds
     */
    var entity: EntityIdentifier? = null,
    
    /**
     * Indicates whether the event is the result of internal activity
     */
    var internalUser: Boolean? = null,
    
    /**
     * The IP address for the event
     */
    var ip: IPInfo? = null,
    
    /**
     * A label assigned to the event
     */
    var label: String? = null,
    
    /**
     * The locale of the user who generated the event
     */
    var locale: String? = null,
    
    /**
     * The location information of the visitor for the event
     */
    var location: LocationInfo? = null,
    
    /**
     * Fields specific to reporting Yext Pages Analytics Events
     */
    var pages: PagesAnalytics? = null,
    
    /**
     * The URL of the page where the event occurred
     */
    var pageUrl: String? = null,
    
    /**
     * The URL of the page which the visitor came from prior to the event
     */
    var referrerUrl: String? = null,
    
    /**
     * Fields specific to reporting Yext Search Analytics Events
     */
    var search: SearchAnalytics? = null,
    
    /**
     * The query entered by the user
     */
    var searchTerm: String? = null,
    
    /**
     * Unique identifier to tie together events in a single browsing session
     */
    var sessionId: String? = null,
    
    /**
     * The timestamp at which the event occurred
     */
    var timestamp: Date? = null,
    
    /**
     * The monetary value of the event
     */
    var value: MonetaryValue? = null,
    
    /**
     * Information used to associate analytics with a particular user
     */
    var visitor: Map<String, String>? = null
)