import { HttpRequesterService } from '../services/HttpRequesterService';
import { AnalyticsPayload } from '../models/AnalyticsPayload';
import fetch from 'cross-fetch';

/**
 * Responsible for making web requests.
 */
export class HttpRequester implements HttpRequesterService {
  post(url: string, body: AnalyticsPayload): Promise<Response> {
    const data = JSON.stringify(body);

    const fetchInit = {
      method: 'POST',
      body: data,
      keepalive: true
    };

    if (typeof(window) !== 'undefined' && window.fetch) {
      return window.fetch(url, fetchInit);
    }

    return fetch(url, fetchInit);
  }

  get(url: string): Promise<Response> {
    const fetchInit = {
      method: 'GET',
      mode: 'no-cors' as RequestMode,
    };

    if (typeof (window) !== 'undefined' && window.fetch) {
      return window.fetch(url, fetchInit);
    }

    return fetch(url, fetchInit);
  }
}