import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for clicking on the button to clear the search input.
 *
 * @public
 */
export interface SearchClearEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.SearchClearButton>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** The vertical key of the vertical if the event was not fired on a universal page. */
  verticalKey?: string
}