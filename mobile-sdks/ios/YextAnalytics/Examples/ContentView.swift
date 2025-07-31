import SwiftUI
import YextAnalytics

@main
struct YextAnalyticsExampleApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @State private var analytics: AnalyticsEventService?
    @State private var message = ""
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Yext Analytics iOS Example")
                .font(.title)
                .padding()
            
            VStack(spacing: 15) {
                Button("Send Page View") {
                    sendPageView()
                }
                .buttonStyle(.borderedProminent)
                
                Button("Send Custom Event") {
                    sendCustomEvent()
                }
                .buttonStyle(.borderedProminent)
                
                Button("Send Chat Event") {
                    sendChatEvent()
                }
                .buttonStyle(.borderedProminent)
                
                Button("Send Conversion Event") {
                    sendConversionEvent()
                }
                .buttonStyle(.borderedProminent)
            }
            
            Text(message)
                .padding()
                .foregroundColor(.secondary)
            
            Spacer()
        }
        .padding()
        .onAppear {
            setupAnalytics()
        }
    }
    
    private func setupAnalytics() {
        do {
            let config = AnalyticsConfig(
                authorizationType: .apiKey,
                authorization: "YOUR_API_KEY_HERE", // Replace with your actual API key
                debug: true // Enable debug mode for testing
            )
            
            analytics = try analytics(config: config)
            message = "Analytics initialized successfully"
        } catch {
            message = "Failed to initialize analytics: \(error.localizedDescription)"
        }
    }
    
    private func sendPageView() {
        Task {
            do {
                let payload = EventPayload(
                    action: .pageView,
                    pageUrl: "app://example/home"
                )
                
                let result = try await analytics?.report(payload)
                await MainActor.run {
                    message = "Page view sent: \(result ?? "")"
                }
            } catch {
                await MainActor.run {
                    message = "Failed to send page view: \(error.localizedDescription)"
                }
            }
        }
    }
    
    private func sendCustomEvent() {
        Task {
            do {
                let payload = EventPayload(
                    action: .custom("BUTTON_CLICKED"),
                    label: "Custom Event Button",
                    customTags: [
                        "screen": "home",
                        "feature": "example"
                    ],
                    customValues: [
                        "clickCount": 1.0
                    ]
                )
                
                let result = try await analytics?.report(payload)
                await MainActor.run {
                    message = "Custom event sent: \(result ?? "")"
                }
            } catch {
                await MainActor.run {
                    message = "Failed to send custom event: \(error.localizedDescription)"
                }
            }
        }
    }
    
    private func sendChatEvent() {
        Task {
            do {
                // First set up a chat analytics service with defaults
                let chatPayload = EventPayload(
                    chat: ChatAnalytics(
                        botId: "example-bot-id",
                        conversationId: "conv-12345"
                    )
                )
                
                let chatAnalytics = analytics?.with(chatPayload)
                
                // Then send a chat impression event
                let eventPayload = EventPayload(action: .chatImpression)
                let result = try await chatAnalytics?.report(eventPayload)
                
                await MainActor.run {
                    message = "Chat event sent: \(result ?? "")"
                }
            } catch {
                await MainActor.run {
                    message = "Failed to send chat event: \(error.localizedDescription)"
                }
            }
        }
    }
    
    private func sendConversionEvent() {
        Task {
            do {
                let payload = EventPayload(
                    action: .custom("PURCHASE"),
                    value: MonetaryValue(amount: 25.99, currency: "USD"),
                    customTags: [
                        "product": "premium_subscription",
                        "payment_method": "credit_card"
                    ],
                    customValues: [
                        "items": 1.0,
                        "discount": 5.0
                    ]
                )
                
                let result = try await analytics?.report(payload)
                await MainActor.run {
                    message = "Conversion event sent: \(result ?? "")"
                }
            } catch {
                await MainActor.run {
                    message = "Failed to send conversion event: \(error.localizedDescription)"
                }
            }
        }
    }
}

#Preview {
    ContentView()
}