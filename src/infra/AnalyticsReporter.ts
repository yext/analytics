import { AnalyticsService } from '../services/AnalyticsService';
import { AnalyticsConfig } from '../models/AnalyticsConfig';
import { HttpRequesterService } from '../services/HttpRequesterService';
import { AnalyticsEvent } from '../models/events/AnalyticsEvent';
import { BeaconPayload } from '../models/BeaconPayload';
import { AnalyticsResponse } from '../models/AnalyticsResponse';

const defaultDomain = 'https://answers.yext-pixel.com';

export class AnalyticsReporter implements AnalyticsService {
  constructor(private config: AnalyticsConfig, private httpRequesterService: HttpRequesterService) {}

  report(event: AnalyticsEvent, additionalRequestAttributes?: BeaconPayload): AnalyticsResponse {
    const domain = this.config.domain ?? defaultDomain;
    const url = `${domain}/realtimeanalytics/data/answers/${this.config.businessId}`;
    const { type, ...eventData } = event;
    const data = {
      eventType: type,
      businessId: this.config.businessId,
      experienceKey: this.config.experienceKey,
      experienceVersion: this.config.experienceVersion,
      ...this._formatForApi(eventData)
    };
    const successfullyQueued = this.httpRequesterService.beacon(
      url, { data, ...additionalRequestAttributes }
    );
    return successfullyQueued
      ? { status: 'success' }
      : { status: 'error', message: 'The useragent failed to queue the data for transfer' };
  }

  /**
   * Formats the event data for the api which includes adapting verticalKey to verticalConfigId
   * @param event The data to format
   * @returns The formatted data
   */
  _formatForApi(event: Omit<AnalyticsEvent, 'type'>): BeaconPayload {
    const transformedEvent: BeaconPayload = { ...event };
    if (transformedEvent.verticalKey) {
      transformedEvent.verticalConfigId = transformedEvent.verticalKey;
      delete transformedEvent.verticalKey;
    }
    return transformedEvent;
  }
}