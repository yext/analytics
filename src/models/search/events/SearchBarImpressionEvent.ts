import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';
import { Searcher } from '../Searcher';

/**
 * Event for expanding or collapsing an accordion row.
 *
 * @public
 */
export interface SearchBarImpressionEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.SearchBarImpression>,
  /** Whether or not the impression came from a standalone search bar. */
  standAlone: boolean,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey?: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher?: Searcher
}