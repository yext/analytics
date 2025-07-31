import XCTest
@testable import YextAnalytics

final class YextAnalyticsTests: XCTestCase {
    
    func testAnalyticsConfigInitialization() {
        let config = AnalyticsConfig(
            authorizationType: .apiKey,
            authorization: "test-key"
        )
        
        XCTAssertEqual(config.authorizationType, .apiKey)
        XCTAssertEqual(config.authorization, "test-key")
        XCTAssertEqual(config.environment, .production)
        XCTAssertEqual(config.region, .us)
        XCTAssertTrue(config.sessionTrackingEnabled)
        XCTAssertFalse(config.debug)
    }
    
    func testAnalyticsReporterInitialization() throws {
        let config = AnalyticsConfig(
            authorizationType: .apiKey,
            authorization: "test-key"
        )
        
        let reporter = try AnalyticsEventReporter(config: config)
        XCTAssertNotNil(reporter)
    }
    
    func testAnalyticsReporterFailsWithEmptyAuthorization() {
        let config = AnalyticsConfig(
            authorizationType: .apiKey,
            authorization: ""
        )
        
        XCTAssertThrowsError(try AnalyticsEventReporter(config: config)) { error in
            XCTAssertTrue(error is AnalyticsError)
        }
    }
    
    func testEventPayloadInitialization() {
        let payload = EventPayload(
            action: .pageView,
            searchTerm: "test search"
        )
        
        XCTAssertEqual(payload.action, .pageView)
        XCTAssertEqual(payload.searchTerm, "test search")
    }
    
    func testCustomAction() {
        let customAction = Action.custom("MY_CUSTOM_EVENT")
        XCTAssertEqual(customAction.rawValue, "C_MY_CUSTOM_EVENT")
    }
    
    func testWithMethod() throws {
        let config = AnalyticsConfig(
            authorizationType: .apiKey,
            authorization: "test-key"
        )
        
        let reporter = try AnalyticsEventReporter(config: config)
        let defaultPayload = EventPayload(searchTerm: "default")
        
        let newReporter = reporter.with(defaultPayload)
        XCTAssertNotNil(newReporter)
    }
    
    func testDebugMode() async throws {
        let config = AnalyticsConfig(
            authorizationType: .apiKey,
            authorization: "test-key",
            debug: true
        )
        
        let reporter = try AnalyticsEventReporter(config: config)
        let payload = EventPayload(action: .pageView)
        
        let result = try await reporter.report(payload)
        XCTAssertEqual(result, "Debug mode - no request sent")
    }
    
    func testEntityIdentifier() throws {
        // Test string entity
        let stringEntity = EntityIdentifier.string("test-entity")
        let jsonData = try JSONEncoder().encode(stringEntity)
        let decodedEntity = try JSONDecoder().decode(EntityIdentifier.self, from: jsonData)
        
        switch decodedEntity {
        case .string(let value):
            XCTAssertEqual(value, "test-entity")
        case .integer:
            XCTFail("Expected string entity")
        }
        
        // Test integer entity
        let intEntity = EntityIdentifier.integer(12345)
        let jsonData2 = try JSONEncoder().encode(intEntity)
        let decodedEntity2 = try JSONDecoder().decode(EntityIdentifier.self, from: jsonData2)
        
        switch decodedEntity2 {
        case .string:
            XCTFail("Expected integer entity")
        case .integer(let value):
            XCTAssertEqual(value, 12345)
        }
    }
    
    func testLocationInfo() throws {
        // Test coordinates location
        let coordinates = Coordinates(latitude: 37.7749, longitude: -122.4194)
        let coordLocation = LocationInfo.coordinates(coordinates)
        let jsonData = try JSONEncoder().encode(coordLocation)
        let decodedLocation = try JSONDecoder().decode(LocationInfo.self, from: jsonData)
        
        switch decodedLocation {
        case .coordinates(let coords):
            XCTAssertEqual(coords.latitude, 37.7749, accuracy: 0.0001)
            XCTAssertEqual(coords.longitude, -122.4194, accuracy: 0.0001)
        case .countryCode:
            XCTFail("Expected coordinates location")
        }
        
        // Test country code location
        let countryLocation = LocationInfo.countryCode("US")
        let jsonData2 = try JSONEncoder().encode(countryLocation)
        let decodedLocation2 = try JSONDecoder().decode(LocationInfo.self, from: jsonData2)
        
        switch decodedLocation2 {
        case .coordinates:
            XCTFail("Expected country code location")
        case .countryCode(let code):
            XCTAssertEqual(code, "US")
        }
    }
}