import { BeaconPayload } from '../models';
import { AnalyticsEvent } from '../models/events/AnalyticsEvent';
import { AnalyticsResponse } from '../models/AnalyticsResponse';
import { Visitor } from '../models/Visitor';

/**
 * A service for reporting analytics events.
 *
 * @public
 */
export interface AnalyticsService {
  /**
   * Reports an analytics event.
   *
   * @param event - The {@link AnalyticsEvent} to be sent
   * @param additionalRequestAttributes - Additional data included in the network request.
   */
  report(event: AnalyticsEvent, additionalRequestAttributes?: BeaconPayload): AnalyticsResponse;
  /**
   * Sets the {@link Visitor} object which is included with each subsequent request
   *
   * @param visitor - The visitor to be set, or undefined
   */
  setVisitor(visitor: Visitor | undefined): void;
}
