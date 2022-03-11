import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * @public
 */
export interface ScrollEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.ScrollToBottomOfPage>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string
}