import { RequestData } from '../models/RequestData';

/**
 * A service for sending requests on the web
 */
export interface RequesterService {
  /**
   * A web beacon request. Returns true only if the request is successfuly queued
   * @param url - The URL to send the request to
   * @param body - The data to be included with the request
   */
  beacon(url: string, body: RequestData): boolean;
}