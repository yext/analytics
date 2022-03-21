import { AnalyticsService } from '../services/AnalyticsService';
import { AnalyticsConfig } from '../models/AnalyticsConfig';
import { HttpRequesterService } from '../services/HttpRequesterService';
import { AnalyticsEvent } from '../models/events/AnalyticsEvent';
import { AnalyticsPayload } from '../models/AnalyticsPayload';
import { Visitor } from '../models/Visitor';

const DEFAULT_DOMAIN = 'https://answers.yext-pixel.com';

/**
 * Responsible for reporting Analytics events.
 */
export class AnalyticsReporter implements AnalyticsService {
  private _visitor: Visitor | undefined;

  constructor(private config: AnalyticsConfig, private httpRequesterService: HttpRequesterService) {
    this.setVisitor(config.visitor);
  }

  /** {@inheritDoc AnalyticsService.report} */
  async report(
    event: AnalyticsEvent,
    additionalRequestAttributes?: AnalyticsPayload
  ): Promise<void> {
    const domain = this.config.domain ?? DEFAULT_DOMAIN;
    const url = `${domain}/realtimeanalytics/data/answers/${this.config.businessId}`;
    const { type, ...eventData } = event;
    const data = {
      eventType: type,
      businessId: this.config.businessId,
      experienceKey: this.config.experienceKey,
      experienceVersion: this.config.experienceVersion,
      ...(this._visitor && { visitor: { ...this._visitor } }),
      ...this._formatForApi(eventData)
    };
    const res = await this.httpRequesterService.post(
      url, { data, ...additionalRequestAttributes }
    );
    if (res.status !== 200) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  }

  /** {@inheritDoc AnalyticsService.setVisitor} */
  setVisitor(visitor: Visitor | undefined): void {
    this._visitor = visitor;
  }

  /**
   * Formats the event data for the api which includes adapting verticalKey to verticalConfigId.
   *
   * @param event - The data to format.
   * @returns The formatted data.
   */
  private _formatForApi(event: Omit<AnalyticsEvent, 'type'>): AnalyticsPayload {
    const transformedEvent: AnalyticsPayload = { ...event };
    if (transformedEvent.verticalKey) {
      transformedEvent.verticalConfigId = transformedEvent.verticalKey;
      delete transformedEvent.verticalKey;
    }
    return transformedEvent;
  }
}