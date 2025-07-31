package com.yext.analytics

import android.content.Context
import kotlinx.coroutines.runBlocking
import org.junit.Test
import org.junit.Assert.*
import org.mockito.Mockito.*

class YextAnalyticsTest {
    
    private val mockContext = mock(Context::class.java)
    
    @Test
    fun testAnalyticsConfigInitialization() {
        val config = AnalyticsConfig(
            authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
            authorization = "test-key"
        )
        
        assertEquals(AnalyticsConfig.AuthorizationType.API_KEY, config.authorizationType)
        assertEquals("test-key", config.authorization)
        assertEquals(AnalyticsConfig.Environment.PRODUCTION, config.environment)
        assertEquals(AnalyticsConfig.Region.US, config.region)
        assertTrue(config.sessionTrackingEnabled)
        assertFalse(config.debug)
    }
    
    @Test(expected = IllegalArgumentException::class)
    fun testAnalyticsConfigFailsWithEmptyAuthorization() {
        AnalyticsConfig(
            authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
            authorization = ""
        )
    }
    
    @Test
    fun testAnalyticsReporterCreation() {
        val config = AnalyticsConfig(
            authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
            authorization = "test-key"
        )
        
        val reporter = YextAnalytics.analytics(config, mockContext)
        assertNotNull(reporter)
    }
    
    @Test
    fun testEventPayloadInitialization() {
        val payload = EventPayload(
            action = Action.PageView,
            searchTerm = "test search"
        )
        
        assertEquals(Action.PageView, payload.action)
        assertEquals("test search", payload.searchTerm)
    }
    
    @Test
    fun testCustomAction() {
        val customAction = Action.Custom("MY_CUSTOM_EVENT")
        assertEquals("C_MY_CUSTOM_EVENT", customAction.value)
    }
    
    @Test
    fun testWithMethod() {
        val config = AnalyticsConfig(
            authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
            authorization = "test-key"
        )
        
        val reporter = YextAnalytics.analytics(config, mockContext)
        val defaultPayload = EventPayload(searchTerm = "default")
        
        val newReporter = reporter.with(defaultPayload)
        assertNotNull(newReporter)
    }
    
    @Test
    fun testDebugMode() = runBlocking {
        val config = AnalyticsConfig(
            authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
            authorization = "test-key",
            debug = true
        )
        
        val reporter = YextAnalytics.analytics(config, mockContext)
        val payload = EventPayload(action = Action.PageView)
        
        val result = reporter.report(payload)
        assertEquals("Debug mode - no request sent", result)
    }
    
    @Test
    fun testBrowserAgent() {
        val browserAgent = BrowserAgent(
            browser = "Test Browser",
            browserVersion = "1.0",
            device = "Test Device",
            deviceClass = "phone",
            os = "Android",
            osVersion = "12",
            userAgent = "Test User Agent"
        )
        
        assertEquals("Test Browser", browserAgent.browser)
        assertEquals("1.0", browserAgent.browserVersion)
        assertEquals("Test Device", browserAgent.device)
        assertEquals("phone", browserAgent.deviceClass)
        assertEquals("Android", browserAgent.os)
        assertEquals("12", browserAgent.osVersion)
        assertEquals("Test User Agent", browserAgent.userAgent)
    }
    
    @Test
    fun testChatAnalytics() {
        val chatAnalytics = ChatAnalytics(
            botId = "test-bot",
            conversationId = "conv-123",
            responseId = "resp-456"
        )
        
        assertEquals("test-bot", chatAnalytics.botId)
        assertEquals("conv-123", chatAnalytics.conversationId)
        assertEquals("resp-456", chatAnalytics.responseId)
    }
    
    @Test
    fun testPagesAnalytics() {
        val pagesAnalytics = PagesAnalytics(
            siteUid = 123,
            template = "location"
        )
        
        assertEquals(123, pagesAnalytics.siteUid)
        assertEquals("location", pagesAnalytics.template)
    }
    
    @Test
    fun testSearchAnalytics() {
        val searchAnalytics = SearchAnalytics(
            experienceKey = "my-search",
            searchId = "search-123",
            queryId = "query-456"
        )
        
        assertEquals("my-search", searchAnalytics.experienceKey)
        assertEquals("search-123", searchAnalytics.searchId)
        assertEquals("query-456", searchAnalytics.queryId)
    }
    
    @Test
    fun testMonetaryValue() {
        val monetaryValue = MonetaryValue(
            amount = 10.50,
            currency = "USD"
        )
        
        assertEquals(10.50, monetaryValue.amount, 0.01)
        assertEquals("USD", monetaryValue.currency)
    }
    
    @Test
    fun testCoordinates() {
        val coordinates = Coordinates(
            latitude = 37.7749,
            longitude = -122.4194
        )
        
        assertEquals(37.7749, coordinates.latitude, 0.0001)
        assertEquals(-122.4194, coordinates.longitude, 0.0001)
    }
}