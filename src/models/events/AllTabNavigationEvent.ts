import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for navigating to the 'all' tab (a universal page). */
export interface AllTabNavigationEvent {
  type: EnumOrLiteral<AnalyticsEventType.AllTabNavigation>,
  /** {@inherticDoc CtaEvent.queryId} */
  queryId?: string
}