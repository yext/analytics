import { AnalyticsConfig } from "../src/AnalyticsConfig";
import { AnalyticsEventReporter } from "../src/AnalyticsEventReporter";

it("Invalid config with no authorization field", () => {
    expect(() => new AnalyticsEventReporter({}))
        .toThrowError("Provide one and only one of API Key or Bearer Token.")
})

it("Invalid config with both authorization field", () => {
    const InvalidConfig: AnalyticsConfig = {
        key: 'mock-api-key',
        bearer: 'mock-bearer-token'
    }
    expect(() => new AnalyticsEventReporter(InvalidConfig))
        .toThrowError("Provide one and only one of API Key or Bearer Token.")
})
