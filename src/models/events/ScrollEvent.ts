import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for scrolling to the bottom of the page.
 *
 * @public
 */
export interface ScrollEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.ScrollToBottomOfPage>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string
}