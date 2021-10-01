import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';

/** Event for submitting thumbs up/down feedback (ThumbsUp and ThumbsDown). */
export interface ThumbsFeedbackEvent {
  type: EnumOrLiteral<AnalyticsEventType.ThumbsUp | AnalyticsEventType.ThumbsDown>
  /** {@inherticDoc CtaData.queryId} */
  queryId: string
  /** {@inheritDoc CtaData.directAnswer} */
  directAnswer?: boolean,
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey?: string,
  /** {@inheritDoc CtaData.entityId} */
  entityId?: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher?: Searcher,
}