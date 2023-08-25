import { AnalyticsConfig } from './AnalyticsConfig';
import { AnalyticsEventReporter } from './AnalyticsEventReporter';
import { AnalyticsEventService } from './AnalyticsEventService';

/**
 * The Yext Analytics Events SDK
 * @beta
 */
const analytics = (config: AnalyticsConfig): AnalyticsEventService => {
  return new AnalyticsEventReporter(config);
};

export default analytics;
