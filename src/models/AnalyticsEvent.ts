import { AnalyticsEventType } from './AnalyticsEventType';
import { AnalyticsEventData } from './AnalyticsEventData';

/**
 * An analytics event
 */
export class AnalyticsEvent {
  constructor(
    public eventType: AnalyticsEventType,
    public data?: AnalyticsEventData
  ) {}
}
