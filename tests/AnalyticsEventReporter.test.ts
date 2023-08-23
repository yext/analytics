import { AnalyticsConfig } from "../src/AnalyticsConfig";
import { AnalyticsEventReporter } from "../src/AnalyticsEventReporter";

it("Invalid config with no authorization field", () => {
    expect(() => new AnalyticsEventReporter({}))
        .toThrowError("Provide one and only one of API Key or Bearer Token.")

    const InvalidConfig1: AnalyticsConfig = {
        key: undefined
    };
    expect(() => new AnalyticsEventReporter(InvalidConfig1))
        .toThrowError("Provide one and only one of API Key or Bearer Token.")

    const InvalidConfig2: AnalyticsConfig = {
        bearer: '   '
    };
    expect(() => new AnalyticsEventReporter(InvalidConfig2))
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

it("Valid config will not throw error", () => {
    const configwithAPI: AnalyticsConfig = {
        key: 'mock-api-key'
    }
    expect(() => new AnalyticsEventReporter(configwithAPI)).not.toThrow();
    const configwithBearer: AnalyticsConfig = {
        bearer: 'mock-bearer-token'
    }
    expect(() => new AnalyticsEventReporter(configwithBearer)).not.toThrow();
})
