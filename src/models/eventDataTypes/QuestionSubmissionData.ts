import { AnalyticsEventData } from "../AnalyticsEventData";
import { Searcher } from "../Searcher";

/** Data for submitting a question (QuestionFocus and QuestionSubmit). */
export interface QuestionSubmissionData extends AnalyticsEventData {
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher: Searcher
}