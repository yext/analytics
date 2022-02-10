import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for pagination interaction. */
export interface PaginationEvent {
  type: EnumOrLiteral<AnalyticsEventType.Paginate>,
  /** {@inheritDoc CtaData.verticalKey} */
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