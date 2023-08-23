import { AnalyticsEventService } from "./AnalyticsEventService"
import { AnalyticsConfig } from "./AnalyticsConfig";
import { EventPayload } from "./EventPayload";
import { EventAPIResponse } from "./EventAPIResponse";

/** Represents an reporter is responsible for reporting analytics events. */
export class AnalyticsEventReporter implements AnalyticsEventService {

    private config: AnalyticsConfig;
    private payload?: EventPayload;

    /**
     * @param config - necessary analytics config: Must provide one and only
     * one of API Key or Bearer Token.
     * 
     * @param payload - (optional) desired event values to report
     */
    constructor(config: AnalyticsConfig, payload?: EventPayload) {
        const apiKeyIsSet = typeof config.key === 'string' && config.key.trim().length !== 0;
        const bearerTokenIsSet = typeof config.bearer === 'string' && config.bearer.trim().length !== 0;
        const configIsValid = (apiKeyIsSet || bearerTokenIsSet) && !(apiKeyIsSet && bearerTokenIsSet);
        if (!configIsValid) {
            throw new Error("Provide one and only one of API Key or Bearer Token.")
        }
        this.config = config;
        this.payload = payload;
    }

    with(payload: EventPayload): AnalyticsEventService {
        return new AnalyticsEventReporter(this.config);
    }

    report(payload: object): Promise<EventAPIResponse> | boolean {
        return false;
    }
}
