import { EventPayload } from './EventPayload';

/**
 * Used by the AnalyticsEventReport report() method to send an analytics event request via
 * Beacon. Used when forceFetch is false and keepalive is not
 * supported by the browser i.e. Firefox, the request is sent via the Beacon API.
 *
 * @param url URL that the request will be sent to
 * @param body the EventPayload object
 */
export function postWithBeacon(url: string, body: EventPayload): boolean {
  return navigator.sendBeacon(url, JSON.stringify(body));
}

/**
 * Used by the AnalyticsEventReport report() method to send an analytics event request via
 * fetch. Used when forceFetch is true.
 *
 * @param url URL that the request will be sent to
 * @param body the EventPayload object
 */
export function postWithFetch(
  url: string,
  body: EventPayload,
): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  });
}

/**
 * Returns a boolean that determines whether the post method should use beacon. Firefox and Firefox
 * for Android do not support fetch + keepAlive, so useBeacon will return true if the browser is
 * Firefox or Firefox for Android.
 *
 * @param body the EventPayload object
 */
export function useBeacon(
  body: EventPayload,
  forceFetch: boolean | undefined,
): boolean {
  // keepAlive is not supported in Firefox or Firefox for Android
  return (
    !forceFetch &&
    !!navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes('firefox')
  );
}
