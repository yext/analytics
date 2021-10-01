import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';
import { Searcher } from '../Searcher';

/** Event for expanding or collapsing an accordion row. */
export interface AccordionToggleEvent {
  type: EnumOrLiteral<AnalyticsEventType.RowExpand | AnalyticsEventType.RowCollapse>
  /** {@inherticDoc CtaData.queryId} */
  queryId: string
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaData.entityId} */
  entityId: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher?: Searcher
}