import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';

/**
 * Event for submitting thumbs up/down feedback (ThumbsUp and ThumbsDown).
 *
 * @public
 */
export interface ThumbsFeedbackEvent {
  type: EnumOrLiteral<AnalyticsEventType.ThumbsUp | AnalyticsEventType.ThumbsDown>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.directAnswer} */
  directAnswer?: boolean,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey?: string,
  /** {@inheritDoc CtaEvent.entityId} */
  entityId?: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher?: Searcher
}