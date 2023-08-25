import {EventPayload} from './EventPayload';

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
export function post(url: string, body: EventPayload, forceFetch: boolean) {
<<<<<<< HEAD
    if (useBeacon(body, forceFetch)) {
        return navigator.sendBeacon(url, JSON.stringify(body));
    }
    return fetch(url, {method: 'POST', body: JSON.stringify(body), keepalive: true});
=======
  if (!forceFetch && useBeacon(body)) {
    return navigator.sendBeacon(url, JSON.stringify(body));
  }
  return fetch(url, {method: 'POST', body: JSON.stringify(body), keepalive: true});
>>>>>>> 5cd5504 (EventsAPi: Implement report)
}

/**
 * Returns a boolean that determines whether the post method should use beacon. Firefox and Firefox
 * for Android do not support fetch + keepAlive, so useBeacon will return true if the browser is
 * Firefox or Firefox for Android.
 *
 * @param body the EventPayload object
 */
<<<<<<< HEAD
export function useBeacon(body: EventPayload, forceFetch: boolean) {
    // keepAlive is not supported in Firefox or Firefox for Android
    return !forceFetch && navigator.userAgent && navigator.userAgent.toLowerCase().includes('firefox');
}
=======
export function useBeacon(body: EventPayload) {
  const agent = body.browserAgent;
  // keepAlive is not supported in Firefox or Firefox for Android
  return (agent && agent.browser && agent.browser.toLowerCase().startsWith('firefox'))
        || (navigator.userAgent && navigator.userAgent.toLowerCase().includes('firefox'));
}
>>>>>>> 5cd5504 (EventsAPi: Implement report)