import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';

/** Event used to calculate the duration of a search. */
export interface SearchDurationEvent {
  type: EnumOrLiteral<
    AnalyticsEventType.ResultsHidden |
    AnalyticsEventType.ResultsUnhidden |
    AnalyticsEventType.FollowUpQuery
  >,
  /** {@inherticDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}