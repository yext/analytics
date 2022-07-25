/**
 * A service for reporting pages analytics events.
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
   * @param eventName
   */
  userInteraction(eventName: string): Promise<void>
}