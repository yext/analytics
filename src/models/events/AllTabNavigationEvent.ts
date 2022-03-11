import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for navigating to the 'all' tab (a universal page).
 *
 * @public
 */
export interface AllTabNavigationEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.AllTabNavigation>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}