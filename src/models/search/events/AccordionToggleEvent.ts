import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';
import { Searcher } from '../Searcher';

/**
 * Event for expanding or collapsing an accordion row. Commonly used for FAQs.
 *
 * @public
 */
export interface AccordionToggleEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.RowExpand | SearchAnalyticsEventType.RowCollapse>,
  /** {@inheritDoc CtaEvent.queryId} */
  queryId: string,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaEvent.entityId} */
  entityId: string,
  /** {@inheritDoc CtaEvent.searcher} */
  searcher?: Searcher
}