package com.yext.analytics

import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import java.util.*
import java.util.concurrent.TimeUnit

/**
 * Protocol defining the analytics event service interface
 */
interface AnalyticsEventService {
    /**
     * Creates a new analytics service with additional default payload values
     */
    fun with(payload: EventPayload): AnalyticsEventService
    
    /**
     * Reports an analytics event
     */
    suspend fun report(payload: EventPayload? = null): String
}

/**
 * Session management utility
 */
internal class SessionManager(private val context: Context) {
    companion object {
        private const val PREFS_NAME = "yext_analytics_prefs"
        private const val SESSION_ID_KEY = "session_id"
        private const val SESSION_START_TIME_KEY = "session_start_time"
        private const val SESSION_TIMEOUT_MINUTES = 30L
    }
    
    private val prefs: SharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    
    fun getOrCreateSessionId(): String {
        val now = System.currentTimeMillis()
        val existingSessionId = prefs.getString(SESSION_ID_KEY, null)
        val sessionStartTime = prefs.getLong(SESSION_START_TIME_KEY, 0L)
        
        // Check if session has expired
        if (existingSessionId != null && 
            now - sessionStartTime < TimeUnit.MINUTES.toMillis(SESSION_TIMEOUT_MINUTES)) {
            
            // Update session start time to extend session
            prefs.edit().putLong(SESSION_START_TIME_KEY, now).apply()
            return existingSessionId
        }
        
        // Create new session
        val newSessionId = generateULID()
        prefs.edit()
            .putString(SESSION_ID_KEY, newSessionId)
            .putLong(SESSION_START_TIME_KEY, now)
            .apply()
        
        return newSessionId
    }
    
    private fun generateULID(): String {
        val encoding = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"
        val timestamp = System.currentTimeMillis()
        val random = Random()
        
        val ulid = StringBuilder(26)
        
        // Encode timestamp (10 characters)
        var ts = timestamp
        repeat(10) {
            ulid.insert(0, encoding[(ts % 32).toInt()])
            ts /= 32
        }
        
        // Add randomness (16 characters)
        repeat(16) {
            ulid.append(encoding[random.nextInt(32)])
        }
        
        return ulid.toString()
    }
}

/**
 * Network manager for handling HTTP requests
 */
internal class NetworkManager {
    companion object {
        private val client = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
        
        private val gson = GsonBuilder()
            .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            .create()
        
        private const val TAG = "YextAnalytics"
        
        fun setupRequestUrl(environment: AnalyticsConfig.Environment, region: AnalyticsConfig.Region): String {
            return when (environment to region) {
                AnalyticsConfig.Environment.PRODUCTION to AnalyticsConfig.Region.US ->
                    "https://analytics.yext.com/api/events"
                AnalyticsConfig.Environment.PRODUCTION to AnalyticsConfig.Region.EU ->
                    "https://analytics.eu.yext.com/api/events"
                AnalyticsConfig.Environment.SANDBOX to AnalyticsConfig.Region.US ->
                    "https://sandbox.analytics.yext.com/api/events"
                AnalyticsConfig.Environment.SANDBOX to AnalyticsConfig.Region.EU ->
                    throw AnalyticsException.InvalidConfiguration("Sandbox environment is not supported in EU region")
            }
        }
        
        suspend fun sendEvent(url: String, payload: EventPayload, config: AnalyticsConfig): String = withContext(Dispatchers.IO) {
            if (config.debug) {
                printDebugLog(payload, config)
                return@withContext "Debug mode - no request sent"
            }
            
            val jsonPayload = gson.toJson(payload)
            val requestBody = jsonPayload.toRequestBody("application/json".toMediaType())
            
            val request = Request.Builder()
                .url(url)
                .post(requestBody)
                .build()
            
            try {
                val response = client.newCall(request).execute()
                if (response.isSuccessful) {
                    response.body?.string() ?: ""
                } else {
                    throw AnalyticsException.HttpError(response.code, response.body?.string())
                }
            } catch (e: Exception) {
                if (e is AnalyticsException) throw e
                throw AnalyticsException.NetworkError(e.message ?: "Unknown network error")
            }
        }
        
        private fun printDebugLog(payload: EventPayload, config: AnalyticsConfig) {
            Log.d(TAG, "[DEBUG] AnalyticsConfig object at time of call to report(): $config")
            Log.d(TAG, "[DEBUG] The following EventPayload would be sent to the Yext Events API: $payload")
        }
    }
}

/**
 * Analytics error types
 */
sealed class AnalyticsException(message: String) : Exception(message) {
    class InvalidConfiguration(message: String) : AnalyticsException("Configuration error: $message")
    class NetworkError(message: String) : AnalyticsException("Network error: $message")
    class HttpError(val code: Int, val body: String?) : AnalyticsException("HTTP error $code: ${body ?: "Unknown error"}")
    class EncodingError(message: String) : AnalyticsException("Encoding error: $message")
}