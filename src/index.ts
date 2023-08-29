import { AnalyticsConfig } from './AnalyticsConfig';
import { AnalyticsEventReporter } from './AnalyticsEventReporter';
import { AnalyticsEventService } from './AnalyticsEventService';

/**
 * The Yext Analytics Events SDK.
 * Returns an AnalyticsEventService given an AnalyticsConfig.
 * @public
 */
export function analytics(config: AnalyticsConfig): AnalyticsEventService {
  return new AnalyticsEventReporter(config);
}

export { AnalyticsConfig, AnalyticsEventService};
