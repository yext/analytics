import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';

/**
 * Event for submitting a question.
 *
 * @public
 */
export interface QuestionSubmissionEvent {
  type: EnumOrLiteral<AnalyticsEventType.QuestionFocus | AnalyticsEventType.QuestionSubmit>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher: Searcher
}