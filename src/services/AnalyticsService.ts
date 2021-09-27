import { RequestData } from '../models';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { AnalyticsResponse } from '../models/AnalyticsResponse';

/**
 * A service for Analytics
 */
export interface AnalyticsService {
  report(event: AnalyticsEvent, additionalData?: RequestData): AnalyticsResponse;
}
