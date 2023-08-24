import {EventPayload} from './EventPayload';
import useBeacon from './browser';

/**
 * Used by the AnalyticsEventReport report() method to send an analytics event request via
 * fetch, with the keepalive option set to true. If forceFetch is false and keepalive is not
 * supported by the browser i.e. Firefox, the request is sent via the Beacon API.
 *
 * @param url URL that the request will be sent to
 * @param body the EventPayload object
 * @param forceFetch if true, it will force the browser to call fetch instead of sendBeacon,
 * regardless of whether keepAlive is supported
 */
const post = async (
    url: string,
    body: EventPayload,
    forceFetch: boolean,
) => {
    if (!forceFetch && useBeacon(body)) {
        return navigator.sendBeacon(url, JSON.stringify(body));
    }
    return fetch(url, {method: 'POST', body: JSON.stringify(body), keepalive: true});
}

export default post;
