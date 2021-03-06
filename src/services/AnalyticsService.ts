import { AnalyticsPayload } from '../models/AnalyticsPayload';
import { AnalyticsEvent } from '../models/events/AnalyticsEvent';
import { Visitor } from '../models/Visitor';

/**
 * A service for reporting analytics events.
 *
 * @public
 */
export interface AnalyticsService {
  /**
   * Reports an analytics event.
   * Will perform a promise rejection if the API response contains an error.
   *
   * @param event - The {@link AnalyticsEvent} to be sent.
   * @param additionalRequestAttributes - Additional data included in the network request.
   */
  report(
    event: AnalyticsEvent,
    additionalRequestAttributes?: AnalyticsPayload
  ): Promise<void>;
  /**
   * Sets the {@link Visitor} object which is included with each subsequent request.
   *
   * @param visitor - The visitor to be set, or undefined.
   */
  setVisitor(visitor: Visitor | undefined): void;
}
