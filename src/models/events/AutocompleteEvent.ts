import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for autocomplete selection.
 *
 * @public
 */
export interface AutocompleteEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.AutocompleteSelection>,
  /** Selected search text from an autocomplete suggestion. */
  suggestedSearchText: string,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId?: string
}