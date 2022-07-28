import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrString } from '../utils';

/**
 * Event used to calculate the duration of a search.
 *
 * @public
 */
export interface SearchDurationEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<
    SearchAnalyticsEventType.ResultsHidden |
    SearchAnalyticsEventType.ResultsUnhidden |
    SearchAnalyticsEventType.FollowUpQuery
  >,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}