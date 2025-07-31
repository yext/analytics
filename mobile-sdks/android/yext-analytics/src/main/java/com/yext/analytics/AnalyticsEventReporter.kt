package com.yext.analytics

import android.content.Context
import android.os.Build

/**
 * Main analytics event reporter implementing the AnalyticsEventService interface
 */
class AnalyticsEventReporter private constructor(
    private val config: AnalyticsConfig,
    private val context: Context,
    private val defaultPayload: EventPayload? = null
) : AnalyticsEventService {
    
    private val sessionManager = SessionManager(context)
    
    companion object {
        private const val SDK_VERSION = "1.0.0"
        
        /**
         * Create a new AnalyticsEventReporter instance
         */
        fun create(config: AnalyticsConfig, context: Context): AnalyticsEventReporter {
            return AnalyticsEventReporter(config, context)
        }
    }
    
    /**
     * Create a new analytics service with additional default payload values
     */
    override fun with(payload: EventPayload): AnalyticsEventService {
        val mergedPayload = merge(defaultPayload, payload)
        return AnalyticsEventReporter(config, context, mergedPayload)
    }
    
    /**
     * Report an analytics event
     */
    override suspend fun report(newPayload: EventPayload?): String {
        val finalPayload = merge(defaultPayload, newPayload ?: EventPayload())
        
        // Handle session tracking
        if (!config.sessionTrackingEnabled) {
            finalPayload.sessionId = null
        } else if (finalPayload.sessionId == null) {
            finalPayload.sessionId = sessionManager.getOrCreateSessionId()
        }
        
        // Add client SDK version
        if (finalPayload.clientSdk == null) {
            finalPayload.clientSdk = mutableMapOf()
        }
        finalPayload.clientSdk!!["ANALYTICS"] = SDK_VERSION
        
        // Set authorization
        finalPayload.authorization = when (config.authorizationType) {
            AnalyticsConfig.AuthorizationType.API_KEY -> "KEY ${config.authorization}"
            AnalyticsConfig.AuthorizationType.BEARER -> "Bearer ${config.authorization}"
        }
        
        // Get device information if not provided
        if (finalPayload.browserAgent == null) {
            finalPayload.browserAgent = getDeviceInfo()
        }
        
        // Setup request URL
        val url = NetworkManager.setupRequestUrl(config.environment, config.region)
        
        // Send the event
        return NetworkManager.sendEvent(url, finalPayload, config)
    }
    
    /**
     * Merge two event payloads, with new payload taking precedence
     */
    private fun merge(base: EventPayload?, new: EventPayload): EventPayload {
        if (base == null) return new.copy()
        
        return base.copy().apply {
            new.action?.let { action = it }
            new.authorization?.let { authorization = it }
            new.bot?.let { bot = it }
            new.browserAgent?.let { browserAgent = it }
            new.chat?.let { chat = it }
            new.clientSdk?.let { clientSdk = mergeStringMaps(clientSdk, it) }
            new.count?.let { count = it }
            new.customTags?.let { customTags = mergeStringMaps(customTags, it) }
            new.customValues?.let { customValues = mergeDoubleMaps(customValues, it) }
            new.destinationUrl?.let { destinationUrl = it }
            new.entity?.let { entity = it }
            new.internalUser?.let { internalUser = it }
            new.ip?.let { ip = it }
            new.label?.let { label = it }
            new.locale?.let { locale = it }
            new.location?.let { location = it }
            new.pages?.let { pages = it }
            new.pageUrl?.let { pageUrl = it }
            new.referrerUrl?.let { referrerUrl = it }
            new.search?.let { search = it }
            new.searchTerm?.let { searchTerm = it }
            new.sessionId?.let { sessionId = it }
            new.timestamp?.let { timestamp = it }
            new.value?.let { value = it }
            new.visitor?.let { visitor = mergeStringMaps(visitor, it) }
        }
    }
    
    private fun mergeStringMaps(base: Map<String, String>?, new: Map<String, String>): Map<String, String> {
        return (base ?: emptyMap()) + new
    }
    
    private fun mergeStringMaps(base: MutableMap<String, String>?, new: Map<String, String>): MutableMap<String, String> {
        val result = base?.toMutableMap() ?: mutableMapOf()
        result.putAll(new)
        return result
    }
    
    private fun mergeDoubleMaps(base: Map<String, Double>?, new: Map<String, Double>): Map<String, Double> {
        return (base ?: emptyMap()) + new
    }
    
    private fun getDeviceInfo(): BrowserAgent {
        return BrowserAgent(
            browser = "Mobile App",
            browserVersion = SDK_VERSION,
            device = "${Build.MANUFACTURER} ${Build.MODEL}",
            deviceClass = getDeviceClass(),
            os = "Android",
            osVersion = Build.VERSION.RELEASE,
            userAgent = "YextAnalytics Android SDK $SDK_VERSION"
        )
    }
    
    private fun getDeviceClass(): String {
        return when {
            context.resources.configuration.smallestScreenWidthDp >= 600 -> "tablet"
            else -> "phone"
        }
    }
}