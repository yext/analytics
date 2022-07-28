import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for clicking on a vertical's View All button on a universal page.
 *
 * @public
 */
export interface VerticalViewAllEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.VerticalViewAll>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** The vertical key of the vertical for which the event was fired. */
  verticalKey: string
}