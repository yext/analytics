import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/**
 * Event for navigating to a vertical tab or page.
 *
 * @public
 */
export interface VerticalTabNavigationEvent {
  type: EnumOrLiteral<AnalyticsEventType.VerticalTabNavigation>,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}