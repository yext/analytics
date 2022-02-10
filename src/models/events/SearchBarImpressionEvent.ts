import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';
import { Searcher } from '../Searcher';

/** Event for expanding or collapsing an accordion row. */
export interface SearchBarImpressionEvent {
  type: EnumOrLiteral<AnalyticsEventType.SearchBarImpression>,
  /** Whether or not the impression came from a standalone search bar */
  standAlone: boolean,
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey?: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher?: Searcher
}