import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for clicking on a vertical's View All button on a universal page. */
export interface VerticalViewAllEvent {
  type: EnumOrLiteral<AnalyticsEventType.VerticalViewAll>,
  /** {@inherticDoc CtaData.queryId} */
  queryId: string,
  /** The vertical key of the vertical for which the event was fired. */
  verticalKey: string
}