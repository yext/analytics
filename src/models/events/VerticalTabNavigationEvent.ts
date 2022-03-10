import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for navigating to a vertical tab or page. */
export interface VerticalTabNavigationEvent {
  type: EnumOrLiteral<AnalyticsEventType.VerticalTabNavigation>,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inherticDoc CtaEvent.queryId} */
  queryId?: string
}