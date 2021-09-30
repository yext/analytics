import { AnalyticsEventData } from "../AnalyticsEventData";
import { Searcher } from "../Searcher";

/** Data for submitting thumbs up/down feedback (ThumbsUp and ThumbsDown). */
export interface ThumbsFeedbackData extends AnalyticsEventData {
  /** {@inheritDoc CtaData.directAnswer} */
  directAnswer: boolean,
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey?: string,
  /** {@inheritDoc CtaData.entityId} */
  entityId?: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher?: Searcher
}