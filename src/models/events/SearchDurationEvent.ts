import { AnalyticsEventType } from '../AnalyticsEventType';
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
    AnalyticsEventType.ResultsHidden |
    AnalyticsEventType.ResultsUnhidden |
    AnalyticsEventType.FollowUpQuery
  >,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}