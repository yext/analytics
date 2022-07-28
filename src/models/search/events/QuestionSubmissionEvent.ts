import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrString } from '../utils';

/**
 * Event for submitting a question.
 *
 * @public
 */
export interface QuestionSubmissionEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.QuestionFocus | SearchAnalyticsEventType.QuestionSubmit>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}