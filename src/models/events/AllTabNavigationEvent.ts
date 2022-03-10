import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/**
 * Event for navigating to the 'all' tab (a universal page).
 *
 * @public
 */
export interface AllTabNavigationEvent {
  type: EnumOrLiteral<AnalyticsEventType.AllTabNavigation>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}