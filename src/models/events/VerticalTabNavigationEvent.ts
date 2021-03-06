import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for navigating to a vertical tab or page.
 *
 * @public
 */
export interface VerticalTabNavigationEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.VerticalTabNavigation>,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}