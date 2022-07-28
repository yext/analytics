import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for navigating to the 'all' tab (a universal page).
 *
 * @public
 */
export interface AllTabNavigationEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.AllTabNavigation>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}