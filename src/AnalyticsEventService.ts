import {EventAPIResponse} from "./EventAPIResponse";
import {EventPayload} from "./EventPayload";

export interface AnalyticsEventService {
    /**
     * Creates a new AnalyticsEventService with the following values defined
     * as the default when making a report.
     *
     * @param payload - desired values to be applied. The new payload will
     * override any overlapping values.
     */
    with(payload: EventPayload): AnalyticsEventService;

    /**
     * Reports an analytics event. Operand will throw an error if the request
     * fails. The request will be sent via Beacon API so that requests are
     * non-blocking. If debug mode is enabled in the config, the request will
     * instead be sent via fetch and a Promise of an EventAPIResponse will be
     * returned.
     *
     * @param payload - desired values to be applied. The new payload will
     * override any overlapping values.
     */
    report(payload: object): boolean | Promise<EventAPIResponse>;
};
