import { RequestData } from '../models';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { AnalyticsMetadata } from '../models/AnalyticsMetadata';

/**
 * A service for Analytics
 */
export interface AnalyticsService {
  report(event: AnalyticsEvent, additionalData?: RequestData): AnalyticsMetadata;
}
