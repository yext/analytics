import {EventPayload} from './EventPayload';

/**
 * Used by the AnalyticsEventReport report() method to send an analytics event request via the
 * Beacon API.
 *
 * todo: Update this method to default to using fetch + keepalive unless not supported and
 * forceFetch is not set to true. Also update the description above.
 *
 * @param url URL that the request will be sent to
 * @param body the EventPayload object
 */
const post = (
    url: string,
    body: EventPayload
) => {
    return navigator.sendBeacon(url, JSON.stringify(body));
}

export default post;
