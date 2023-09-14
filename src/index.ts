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

export * from './AnalyticsConfig';
export * from './AnalyticsEventService';
export * from './Environment';
export * from './Region';
export * from './EventPayload';
export * from './EventAPIResponse';
export * from './EnumOrString';
export * from './Action';
