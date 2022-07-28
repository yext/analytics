import { AnalyticsPayload, SearchAnalyticsEvent, Visitor } from '../models';

/**
 * A service for reporting search analytics events.
 *
 * @public
 */
export interface SearchAnalyticsService {
  /**
   * Reports an analytics event.
   * Will perform a promise rejection if the API response contains an error.
   *
   * @param event - The {@link SearchAnalyticsEvent} to be sent.
   * @param additionalRequestAttributes - Additional data included in the network request.
   */
  report(
    event: SearchAnalyticsEvent,
    additionalRequestAttributes?: AnalyticsPayload
  ): Promise<void>;
  /**
   * Sets the {@link Visitor} object which is included with each subsequent request.
   *
   * @param visitor - The visitor to be set, or undefined.
   */
  setVisitor(visitor: Visitor | undefined): void;

  /**
   * Turns on debug logging for event details.  Will log details to the console when report() is called.
   *
   * @param enabled - whether debug logging should be turned on
   */
  setDebugEnabled(enabled: boolean): void;
}
