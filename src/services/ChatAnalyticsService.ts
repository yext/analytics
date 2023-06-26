import { EventAPIResponse, ChatEventPayLoad } from '../models';

/**
 * A service for reporting chat analytics events.
 *
 * @public
 */
export interface ChatAnalyticsService {
  /**
   * Reports an analytics event.
   * Will perform a promise rejection if the API response contains an error.
   *
   * @param event - The {@link ChatEventPayLoad} to be sent.
   */
  report(
    event: ChatEventPayLoad,
  ): Promise<EventAPIResponse>;
}