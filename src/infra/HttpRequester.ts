import { HttpRequesterService } from '../services';
import { AnalyticsPayload, EventPayload } from '../models';
import fetch from 'cross-fetch';

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

    const fetchInit: RequestInit = {
      method: 'POST',
      headers,
      body: data,
      keepalive: true
    };

    if (typeof(window) !== 'undefined' && window.fetch) {
      return window.fetch(url, fetchInit);
    }

    return fetch(url, fetchInit);
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