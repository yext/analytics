import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';
import { Searcher } from '../Searcher';

/**
 * Event for expanding or collapsing an accordion row.
 *
 * @public
 */
export interface AccordionToggleEvent {
  type: EnumOrLiteral<AnalyticsEventType.RowExpand | AnalyticsEventType.RowCollapse>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.entityId} */
  entityId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher?: Searcher
}