import { ConversionEvent, COOKIE_PARAM, ListingsClickEvent } from '../models';
import { DEFAULT_CONVERSION_TRACKING_DOMAIN, LISTINGS_SOURCE_PARAM } from '../models/constants';
import { CommonConversionData } from '../models/conversiontracking/CommonConversionData';
import { ConversionTrackingService, HttpRequesterService } from '../services';
import { calculateSeed } from './CalculateSeed';

const conversionEndpoint = 'conversiontracking/conversion';
const listingsEndpoint = 'listings';

export class ConversionTrackingReporter implements ConversionTrackingService {
  private _debug: boolean|undefined;
  constructor(
    private httpRequesterService: HttpRequesterService,
    private debug?: boolean|undefined,
  ) {
    this._debug = debug;
  }

  /**
   * Prints event details to the console for debugging of analytics events as they fire.
   * @param event - the details of the event that will be printed
   * @param type - the type of the event that was tracked
   */
  private printEvent(event: string, type: string): void {
    if (!this._debug) return;
    console.log(
      `%c[YextAnalytics]%c- Tracked ${type} event: ${event}`,
      'background: white; color: blue;',
      '',
    );
  }

  async handleRequest(url: string): Promise<void> {
    const res = await this.httpRequesterService.get(url.toString());
    if (res.status !== 200 && !(res.type === 'opaqueredirect' || res.type === 'opaque')) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  }

  private static formatBaseEvent(event: CommonConversionData, params: URLSearchParams): void {
    params.set(COOKIE_PARAM, event.cookieId);
    if (event.referrer) params.set('referrer', event.referrer);
    params.set('v', calculateSeed().toString());
    params.set('location', event.location);
  }

  /** {@inheritDoc ConversionTrackingService.trackConversion} */
  async trackConversion(event: ConversionEvent): Promise<void> {
    const url = new URL(`https://${DEFAULT_CONVERSION_TRACKING_DOMAIN}/${conversionEndpoint}`);
    const params = new URLSearchParams();
    params.set('cid', event.cid);
    if (event.cv) params.set('cv', event.cv);
    ConversionTrackingReporter.formatBaseEvent(event, params);
    url.search = params.toString();
    await this.handleRequest(url.toString());
    this.printEvent(event.cid, 'Conversion');
  }

  /** {@inheritDoc ConversionTrackingService.trackListings} */
  async trackListings(event: ListingsClickEvent): Promise<void> {
    const url = new URL(`https://${DEFAULT_CONVERSION_TRACKING_DOMAIN}/${listingsEndpoint}`);
    const params = new URLSearchParams();
    params.set(LISTINGS_SOURCE_PARAM, event.source);
    ConversionTrackingReporter.formatBaseEvent(event, params);
    url.search = params.toString();
    await this.handleRequest(url.toString());
    this.printEvent(event.source, 'Listings Click');
  }

  /** {@inheritDoc ConversionTrackingService.setDebugEnabled} */
  setDebugEnabled(enabled: boolean): void {
    this._debug = enabled;
  }
}