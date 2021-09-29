import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for submitting thumbs up/down feedback (ThumbsUp and ThumbsDown). */
export interface ThumbsFeedbackData extends AnalyticsEventData {
  /** {@inheritdoc CtaData.directAnswer} */
  directAnswer: boolean,
  /** {@inheritdoc CtaData.searcher} */
  searcher?: string,
  /** {@inheritdoc CtaData.verticalKey} */
  verticalKey?: string,
  /** {@inheritdoc CtaData.entityId} */
  entityId?: string
}