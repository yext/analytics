import { RequesterService } from '../services/RequesterService';
import { RequestData } from '../models/RequestData';

/**
 * Responsible for making web requests
 */
export class Requester implements RequesterService {
  beacon<T>(url: string, body: RequestData): boolean {
    return true;
  }
};
