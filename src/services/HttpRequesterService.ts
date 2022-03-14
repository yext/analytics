import { BeaconPayload } from '../models/BeaconPayload';
/**
 * A service for sending requests on the web.
 */
export interface HttpRequesterService {
  /**
   * A web beacon request. Returns true only if the request is successfuly queued.
   * @param url - The URL to send the request to.
   * @param body - The payload to be included with the request.
   */
  beacon(url: string, body: BeaconPayload): boolean;
}