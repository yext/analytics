import { HttpRequesterService } from '../services';
import { AnalyticsPayload, EventPayload } from '../models';
import fetch from 'cross-fetch';
import { isFirefox } from '../utils/Browser';

/**
 * Responsible for making web requests.
 *
 */
export class HttpRequester implements HttpRequesterService {
  post(
    url: string,
    body: AnalyticsPayload | EventPayload,
    headers?: Record<string, string>
  ): Promise<Response> {
    const data = JSON.stringify(body);

    if (isFirefox()) {
      // send via beacon if the browser is using firefox since it does not support fetch w/keepalive
      var enqueuedEvent = navigator.sendBeacon(url, data);
      if (enqueuedEvent) {
        return Promise.resolve(new Response(null, { status: 204 }));
      } else {
        // If there was a failure enqueing the event just reject
        // with a Response that indicates an error. 
        // Fetch by default does not reject promises and instead just 
        // handles errors with a successful promise with an error that 
        // indicates an error
        return Promise.resolve(Response.error());
      }
    } else {
      const fetchInit: RequestInit = {
        method: 'POST',
        headers,
        body: data,
        keepalive: true
      };

      if (typeof (window) !== 'undefined' && window.fetch) {
        return window.fetch(url, fetchInit);
      }
      return fetch(url, fetchInit);
    }
  }



  get(url: string): Promise<Response> {
    const fetchInit: RequestInit = {
      method: 'GET',
      mode: 'no-cors',
      keepalive: true,
    };

    if (typeof (window) !== 'undefined' && window.fetch) {
      return window.fetch(url, fetchInit);
    }

    return fetch(url, fetchInit);
  }

}