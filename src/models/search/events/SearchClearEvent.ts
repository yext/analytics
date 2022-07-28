import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for clicking on the button to clear the search input.
 *
 * @public
 */
export interface SearchClearEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.SearchClearButton>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** The vertical key of the vertical if the event was not fired on a universal page. */
  verticalKey?: string
}