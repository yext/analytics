import { ConversionDetails } from '../models/conversiontracking/ConversionDetails';
import {PagesAnalyticsEvent} from '../models/pages/events/PagesAnalyticsEvent';
import {Visitor} from '../models';

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
   * @param event - the pages event to track
   * @param conversionInfo - Optional parameter to pass with the CID from the conversion tag if this event
   * should represent a conversion and conversion tracking is enabled.
   */
  track(event: PagesAnalyticsEvent, conversionInfo?: ConversionDetails): Promise<void>;

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

  /**
   * Turns on conversion tracking. Will allow page views and other events to receive credit for
   * conversion events.
   */
  setConversionTrackingEnabled(enabled: boolean, cookieId: string): void
}