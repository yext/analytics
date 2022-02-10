import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for clicking on the button to clear the search input. */
export interface SearchClearEvent {
  type: EnumOrLiteral<AnalyticsEventType.SearchClearButton>,
  /** {@inherticDoc CtaData.queryId} */
  queryId: string,
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey?: string
}