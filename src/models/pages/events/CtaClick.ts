import { PagesAnalyticsEvent } from './PagesAnalyticsEvent';
import { DefaultPagesEventNames } from './DefaultPagesEventNames';

/**
 * A Pages CTA Event
 *
 * @public
 */
export const CtaClick: PagesAnalyticsEvent = {
  eventType: DefaultPagesEventNames.CTA,
};