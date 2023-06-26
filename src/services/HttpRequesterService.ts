import { AnalyticsPayload, EventPayload } from '../models';
/**
 * A service for sending requests on the web.
 *
 */
export interface HttpRequesterService {
  /**
   * A POST request.
   * @param url - The URL to send the request to.
   * @param body - The payload to be included with the request.
   * @param headers - The headers to be included with the request.
   */
   post(
    url: string,
    body: AnalyticsPayload | EventPayload,
    headers?: Record<string, string>
  ): Promise<Response>;

    /**
     * A GET request.
     * @param url - the URL to send the request to
     */
    get(url: string): Promise<Response>;
}