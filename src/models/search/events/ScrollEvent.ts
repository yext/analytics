import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for scrolling to the bottom of the page.
 *
 * @public
 */
export interface ScrollEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.ScrollToBottomOfPage>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string
}