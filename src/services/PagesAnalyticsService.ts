/**
 * A service for reporting pages analytics events.
 *
 * @public
 */
export interface PagesAnalyticsService {
  /**
   * Reports a page view event.
   * Will preform a promise rejection if the API contains an error or if
   * the parameters are misconfigured.
   */
  pageView(): Promise<void>

  /**
   * Reports a user interaction event.
   * Will perform a promis rejection if the API contains an error or if
   * the parameters are misconfigured.
   * @param eventName - the name of the event to track
   */
  userInteraction(eventName: string): Promise<void>
}