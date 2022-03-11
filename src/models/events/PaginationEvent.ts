import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for pagination interaction.
 *
 * @public
 */
export interface PaginationEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<AnalyticsEventType.Paginate>,
  /** {@inheritDoc CtaEvent.verticalKey} */
  verticalKey: string,
  /** The ID of the query correspond to this pagination sequence. */
  queryId: string,
  /** Current page number */
  currentPage: number,
  /** Next page number to navigate to */
  newPage: number,
  /** Total page count from pagination */
  totalPageCount: number
}