import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/**
 * @public
 */
export interface ScrollEvent {
  type: EnumOrLiteral<AnalyticsEventType.ScrollToBottomOfPage>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string
}