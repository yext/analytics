import { PagesAnalyticsEvent } from './PagesAnalyticsEvent';
import { DefaultPagesEventNames } from './DefaultPagesEventNames';

/**
 * A Pages PageView Event
 *
 * @public
 */
export const PageViewEvent: PagesAnalyticsEvent = {
  eventType: DefaultPagesEventNames.PageView,
};