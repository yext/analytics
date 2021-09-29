import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for submitting a question (QuestionFocus and QuestionSubmit). */
export interface QuestionSubmissionData extends AnalyticsEventData {
  /** {@inheritdoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritdoc CtaData.searcher} */
  searcher: string
}