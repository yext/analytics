import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for autocomplete selection.
 *
 * @public
 */
export interface AutocompleteEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.AutocompleteSelection>,
  /** Selected search text from an autocomplete suggestion. */
  suggestedSearchText: string,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}