import {DefaultPagesEventNames} from './DefaultPagesEventNames';

/**
 * An event from the Pages system
 *
 * @public
 */
export interface PagesAnalyticsEvent {
  /**
   * The event ID, will be displayed in Analytics reporting in your Yext Account.
   * Can be one of the built in types or a custom one.  Custom ones should start with `C_`.
   */
  eventType:
    DefaultPagesEventNames.PageView |
    DefaultPagesEventNames.CTA |
    DefaultPagesEventNames.PhoneCall |
    DefaultPagesEventNames.DrivingDirection |
    DefaultPagesEventNames.Website |
    string
}
