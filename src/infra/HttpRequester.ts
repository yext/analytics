import { HttpRequesterService } from '../services/HttpRequesterService';
import { AnalyticsPayload } from '../models/AnalyticsPayload';
import fetch from 'cross-fetch';

/**
 * Responsible for making web requests.
 */
export class HttpRequester implements HttpRequesterService {
  post(url: string, body: AnalyticsPayload): Promise<Response> {
    const data = JSON.stringify(body);

    return fetch(url, {
      method: 'POST',
      body: data,
      keepalive: true
    });
  }
}