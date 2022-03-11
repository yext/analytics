import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrString } from '../utils';

/**
 * Event for submitting a question.
 *
 * @public
 */
export interface QuestionSubmissionEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.QuestionFocus | AnalyticsEventType.QuestionSubmit>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}