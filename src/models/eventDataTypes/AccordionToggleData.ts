import { AnalyticsEventData } from "../AnalyticsEventData";
import { Searcher } from "../Searcher";

/** Data for expanding or collapsing an accordion row (RowExpand and RowCollapse). */
export interface AccordionToggleData extends AnalyticsEventData {
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaData.entityId} */
  entityId: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher?: Searcher
}