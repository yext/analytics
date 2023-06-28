import { HttpRequesterService, SearchAnalyticsService } from '../services';
import { AnalyticsPayload, SearchAnalyticsConfig, SearchAnalyticsEvent, Visitor } from '../models';
import { getSearchEndpoint } from '../utils/endpointProviders';

/**
 * Responsible for reporting Analytics events.
 *
 * @public
 */
export class SearchAnalyticsReporter implements SearchAnalyticsService {
  private _visitor: Visitor | undefined;
  private _debug: boolean|undefined;
  private readonly _endpoint: string;
  constructor(private config: SearchAnalyticsConfig, private httpRequesterService: HttpRequesterService) {
    this.setVisitor(config.visitor);
    this._debug = config.debug;
    this._endpoint = getSearchEndpoint(
      this.config.businessId,
      this.config.region,
      this.config.env,
      this.config.domain
    );
  }

  /**
   * Prints event details to the console for debugging of analytics events as they fire.
   * @param event - the SearchAnalyticsEvent that will be printed
   */
  private printEvent(event: SearchAnalyticsEvent): void {
    if (!this._debug) return;
    console.log(
      `%c[YextAnalytics]%c- Tracked Search event: ${event.type}`,
      'background: white; color: blue;',
      '',
    );
  }

  /** {@inheritDoc AnalyticsService.report} */
  async report(
    event: SearchAnalyticsEvent,
    additionalRequestAttributes?: AnalyticsPayload
  ): Promise<void> {
    const { type, ...eventData } = event;
    const data = {
      eventType: type,
      businessId: this.config.businessId,
      experienceKey: this.config.experienceKey,
      experienceVersion: this.config.experienceVersion,
      ...(this._visitor && { visitor: { ...this._visitor } }),
      ...SearchAnalyticsReporter._formatForApi(eventData)
    };
    const res = await this.httpRequesterService.post(
      this._endpoint, { data, ...additionalRequestAttributes }
    );
    if (res.status !== 200) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
    this.printEvent(event);
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
  private static _formatForApi(event: Omit<SearchAnalyticsEvent, 'type'>): AnalyticsPayload {
    const transformedEvent: AnalyticsPayload = { ...event };
    if (transformedEvent.verticalKey) {
      transformedEvent.verticalConfigId = transformedEvent.verticalKey;
      delete transformedEvent.verticalKey;
    }
    return transformedEvent;
  }

  /** {@inheritDoc SearchAnalyticsService.setDebugEnabled} */
  setDebugEnabled(enabled: boolean): void {
    this._debug = enabled;
  }
}