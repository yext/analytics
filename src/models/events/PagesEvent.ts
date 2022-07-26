/**
 * An event from the Pages system
 *
 * @public
 */
export interface PagesEvent {
  /** The event ID, will be displayed in Analytics reporting in your Yext Account. */
  eventType: 'pageview' | string
}
