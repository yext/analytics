import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for autocomplete selection. */
export interface AutocompleteEvent {
  type: EnumOrLiteral<AnalyticsEventType.AutocompleteSelection>,
  /** Selected search text from an autocomplete suggestion. */
  suggestedSearchText: string,
  /** {@inherticDoc CtaEvent.queryId} */
  queryId?: string
}