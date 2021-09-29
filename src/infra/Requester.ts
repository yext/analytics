import { RequesterService } from '../services/RequesterService';
import { BeaconPayload } from '../models/BeaconPayload';

/**
 * Responsible for making web requests
 */
export class Requester implements RequesterService {
  beacon(url: string, body: BeaconPayload): boolean {
    return true;
  }
};
