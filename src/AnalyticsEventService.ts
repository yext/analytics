import {EventAPIResponse} from './EventAPIResponse';
import {EventPayload, PartialPayload} from './EventPayload';

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
     * fails. The request will default to being sent via fetch, with keepalive set to true,
     * if supported by the browser, and a Promise of an EventAPIResponse will be returned.
     * Otherwise, the request will be sent via the Beacon API, unless the forceFetch flag is
     * toggled, and a boolean will be returned.
     *
     * @param payload - desired values to be applied. The new payload will
     * override any overlapping values.
     */
    report(payload?: PartialPayload): Promise<boolean | EventAPIResponse>
}
