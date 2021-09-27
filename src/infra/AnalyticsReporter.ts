import { AnalyticsService } from '../services/AnalyticsService';
import { AnalyticsConfig } from '../models/AnalyticsConfig';
import { RequesterService } from '../services/RequesterService';
import { AnalyticsEvent } from '../models/AnalyticsEvent';
import { RequestData } from '../models/RequestData';
import { AnalyticsResponse } from '../models/AnalyticsResponse';

const defaultDomain = 'https://answers.yext-pixel.com';

export class AnalyticsReporter implements AnalyticsService {
  constructor(private config: AnalyticsConfig, private RequesterService: RequesterService) {};

  report (event: AnalyticsEvent, additionalData?: RequestData): AnalyticsResponse {
    const domain = this.config.domain ?? defaultDomain;
    const url = `${domain}/realtimeanalytics/data/answers/${this.config.businessId}`;
    const data = {
      eventType: event.eventType,
      businessId: this.config.businessId,
      experienceKey: this.config.experienceKey,
      experienceVersion: this.config.experienceVersion,
      ...this.config.baseData,
      ...event.data,
    }
    const successfullyQueued = this.RequesterService.beacon(url, { data, ...additionalData });
    return successfullyQueued
      ? { status: 'success' }
      : { status: 'error', message: 'The useragent failed to queue the data for transfer' };
  }
}