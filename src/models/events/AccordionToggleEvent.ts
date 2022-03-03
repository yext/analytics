import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';
import { Searcher } from '../Searcher';

/** Event for expanding or collapsing an accordion row. */
export interface AccordionToggleEvent {
  type: EnumOrLiteral<AnalyticsEventType.RowExpand | AnalyticsEventType.RowCollapse>,
  /** {@inherticDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.entityId} */
  entityId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher?: Searcher
}