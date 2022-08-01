import { ConversionEvent, ListingsClickEvent } from '../models';

/**
 * A service for tracking conversions
 *
 * @public
 */
export interface ConversionTrackingService {
  /**
   * tracks a conversion event
   * @param event - a Conversion event
   */
  trackConversion(event: ConversionEvent): void;

  /**
   * tracks a user's arrival on a landing page from a listings publisher
   * @param event - the event to track
   */
  trackListings(event: ListingsClickEvent): Promise<void>
  /**
   * Turns on debug logging for event details.  Will log details to the console when report() is called.
   *
   * @param enabled - whether debug logging should be turned on
   */
  setDebugEnabled(enabled: boolean): void;
}