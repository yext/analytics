import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

export interface ScrollEvent {
  type: EnumOrLiteral<
    AnalyticsEventType.ScrollToBottomOfPage
  >
  /** {@inherticDoc CtaData.queryId} */
  queryId: string
}