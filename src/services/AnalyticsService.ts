import { BeaconPayload } from '../models';
import { AnalyticsEvent } from '../models/events/AnalyticsEvent';
import { AnalyticsResponse } from '../models/AnalyticsResponse';
import { Visitor } from '../models/Visitor';

/**
 * A service for Analytics.
 *
 * @public
 */
export interface AnalyticsService {
  report(event: AnalyticsEvent, additionalRequestAttributes?: BeaconPayload): AnalyticsResponse;
  setVisitor(visitor: Visitor | undefined): void;
}
