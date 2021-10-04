import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';

/** Event for submitting a question. */
export interface QuestionSubmissionEvent {
  type: EnumOrLiteral<AnalyticsEventType.QuestionFocus | AnalyticsEventType.QuestionSubmit>,
  /** {@inherticDoc CtaData.queryId} */
  queryId: string
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher: Searcher
}