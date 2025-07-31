package com.yext.analytics

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import java.util.Date

/**
 * Coordinates representing latitude and longitude
 */
@Parcelize
data class Coordinates(
    val latitude: Double,
    val longitude: Double
) : Parcelable

/**
 * The version label of the search config
 */
enum class VersionLabel {
    PRODUCTION,
    STAGING
}

/**
 * Browser agent information
 */
@Parcelize
data class BrowserAgent(
    val browser: String? = null,
    val browserVersion: String? = null,
    val device: String? = null,
    val deviceClass: String? = null,
    val os: String? = null,
    val osVersion: String? = null,
    val userAgent: String? = null
) : Parcelable

/**
 * Chat-specific analytics fields
 */
@Parcelize
data class ChatAnalytics(
    val botId: String,
    val conversationId: String? = null,
    val responseId: String? = null
) : Parcelable

/**
 * Pages-specific analytics fields
 */
@Parcelize
data class PagesAnalytics(
    val scope: String? = null,
    val originalEventName: String? = null,
    val siteUid: Int? = null,
    val template: String? = null
) : Parcelable

/**
 * Search-specific analytics fields
 */
@Parcelize
data class SearchAnalytics(
    val experienceKey: String,
    val searchId: String? = null,
    val queryId: String? = null,
    val verticalKey: String? = null,
    val isDirectAnswer: Boolean? = null,
    val versionLabel: VersionLabel? = null,
    val versionNumber: Int? = null,
    val isGenerativeDirectAnswer: Boolean? = null
) : Parcelable

/**
 * IP address information
 */
@Parcelize
data class IPInfo(
    val address: String,
    val algorithm: String
) : Parcelable

/**
 * Monetary value information
 */
@Parcelize
data class MonetaryValue(
    val amount: Double,
    val currency: String
) : Parcelable

/**
 * Entity identifier can be either a string or integer
 */
sealed class EntityIdentifier {
    data class StringId(val value: String) : EntityIdentifier()
    data class IntId(val value: Int) : EntityIdentifier()
}

/**
 * Location information can be either coordinates or country code
 */
sealed class LocationInfo {
    data class CoordinatesLocation(val coordinates: Coordinates) : LocationInfo()
    data class CountryCodeLocation(val countryCode: String) : LocationInfo()
}