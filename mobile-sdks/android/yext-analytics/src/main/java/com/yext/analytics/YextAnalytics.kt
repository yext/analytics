package com.yext.analytics

import android.content.Context

/**
 * Main entry point for the Yext Analytics Events SDK
 * Returns an AnalyticsEventService given an AnalyticsConfig and Android Context
 */
object YextAnalytics {
    /**
     * Create an analytics event service with the given configuration
     */
    fun analytics(config: AnalyticsConfig, context: Context): AnalyticsEventService {
        return AnalyticsEventReporter.create(config, context)
    }
}