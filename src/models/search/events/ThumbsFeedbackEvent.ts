import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrString } from '../utils';

/**
 * Event for submitting thumbs up/down feedback (ThumbsUp and ThumbsDown).
 *
 * @public
 */
export interface ThumbsFeedbackEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.ThumbsUp | SearchAnalyticsEventType.ThumbsDown>,
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