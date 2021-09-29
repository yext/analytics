import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for expanding or collapsing an accordion row (RowExpand and RowCollapse). */
export interface AccordionToggleData extends AnalyticsEventData {
  /** {@inheritdoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritdoc CtaData.entityId} */
  entityId: string,
  /** {@inheritdoc CtaData.searcher} */
  searcher?: string
}