package com.yext.analytics.example

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.launch
import com.yext.analytics.*

class MainActivity : ComponentActivity() {
    private lateinit var analytics: AnalyticsEventService
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setupAnalytics()
        
        setContent {
            YextAnalyticsExampleApp()
        }
    }
    
    private fun setupAnalytics() {
        try {
            val config = AnalyticsConfig(
                authorizationType = AnalyticsConfig.AuthorizationType.API_KEY,
                authorization = "YOUR_API_KEY_HERE", // Replace with your actual API key
                debug = true // Enable debug mode for testing
            )
            
            analytics = YextAnalytics.analytics(config, this)
            Log.d("Analytics", "Analytics initialized successfully")
        } catch (e: Exception) {
            Log.e("Analytics", "Failed to initialize analytics", e)
        }
    }
    
    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    fun YextAnalyticsExampleApp() {
        var message by remember { mutableStateOf("") }
        val context = LocalContext.current
        
        MaterialTheme {
            Scaffold(
                topBar = {
                    TopAppBar(
                        title = { Text("Yext Analytics Android Example") }
                    )
                }
            ) { paddingValues ->
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    
                    Button(
                        onClick = { sendPageView { message = it } },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Page View")
                    }
                    
                    Button(
                        onClick = { sendCustomEvent { message = it } },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Custom Event")
                    }
                    
                    Button(
                        onClick = { sendChatEvent { message = it } },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Chat Event")
                    }
                    
                    Button(
                        onClick = { sendConversionEvent { message = it } },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Conversion Event")
                    }
                    
                    Button(
                        onClick = { sendSearchEvent { message = it } },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Search Event")
                    }
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Card(
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(
                            text = message.ifEmpty { "Tap a button to send an event" },
                            modifier = Modifier.padding(16.dp)
                        )
                    }
                }
            }
        }
    }
    
    private fun sendPageView(onResult: (String) -> Unit) {
        lifecycleScope.launch {
            try {
                val payload = EventPayload(
                    action = Action.PageView,
                    pageUrl = "app://example/home"
                )
                
                val result = analytics.report(payload)
                onResult("Page view sent: $result")
                Log.d("Analytics", "Page view sent successfully")
            } catch (e: Exception) {
                val errorMsg = "Failed to send page view: ${e.message}"
                onResult(errorMsg)
                Log.e("Analytics", errorMsg, e)
            }
        }
    }
    
    private fun sendCustomEvent(onResult: (String) -> Unit) {
        lifecycleScope.launch {
            try {
                val payload = EventPayload(
                    action = Action.Custom("BUTTON_CLICKED"),
                    label = "Custom Event Button",
                    customTags = mapOf(
                        "screen" to "home",
                        "feature" to "example"
                    ),
                    customValues = mapOf(
                        "clickCount" to 1.0
                    )
                )
                
                val result = analytics.report(payload)
                onResult("Custom event sent: $result")
                Log.d("Analytics", "Custom event sent successfully")
            } catch (e: Exception) {
                val errorMsg = "Failed to send custom event: ${e.message}"
                onResult(errorMsg)
                Log.e("Analytics", errorMsg, e)
            }
        }
    }
    
    private fun sendChatEvent(onResult: (String) -> Unit) {
        lifecycleScope.launch {
            try {
                // First set up a chat analytics service with defaults
                val chatPayload = EventPayload(
                    chat = ChatAnalytics(
                        botId = "example-bot-id",
                        conversationId = "conv-12345"
                    )
                )
                
                val chatAnalytics = analytics.with(chatPayload)
                
                // Then send a chat impression event
                val eventPayload = EventPayload(action = Action.ChatImpression)
                val result = chatAnalytics.report(eventPayload)
                
                onResult("Chat event sent: $result")
                Log.d("Analytics", "Chat event sent successfully")
            } catch (e: Exception) {
                val errorMsg = "Failed to send chat event: ${e.message}"
                onResult(errorMsg)
                Log.e("Analytics", errorMsg, e)
            }
        }
    }
    
    private fun sendConversionEvent(onResult: (String) -> Unit) {
        lifecycleScope.launch {
            try {
                val payload = EventPayload(
                    action = Action.Custom("PURCHASE"),
                    value = MonetaryValue(amount = 25.99, currency = "USD"),
                    customTags = mapOf(
                        "product" to "premium_subscription",
                        "payment_method" to "credit_card"
                    ),
                    customValues = mapOf(
                        "items" to 1.0,
                        "discount" to 5.0
                    )
                )
                
                val result = analytics.report(payload)
                onResult("Conversion event sent: $result")
                Log.d("Analytics", "Conversion event sent successfully")
            } catch (e: Exception) {
                val errorMsg = "Failed to send conversion event: ${e.message}"
                onResult(errorMsg)
                Log.e("Analytics", errorMsg, e)
            }
        }
    }
    
    private fun sendSearchEvent(onResult: (String) -> Unit) {
        lifecycleScope.launch {
            try {
                val payload = EventPayload(
                    action = Action.QuestionSubmit,
                    search = SearchAnalytics(
                        experienceKey = "example-search",
                        searchId = "search-12345",
                        queryId = "query-67890"
                    ),
                    searchTerm = "best coffee near me"
                )
                
                val result = analytics.report(payload)
                onResult("Search event sent: $result")
                Log.d("Analytics", "Search event sent successfully")
            } catch (e: Exception) {
                val errorMsg = "Failed to send search event: ${e.message}"
                onResult(errorMsg)
                Log.e("Analytics", errorMsg, e)
            }
        }
    }
}