import { COOKIE_PARAM, DEFAULT_CONVERSION_TRACKING_DOMAIN, LISTINGS_SOURCE_PARAM } from '../models/constants';
import { ConversionDetails } from '../models';
import { HttpRequesterService, PagesAnalyticsService } from '../services';
import { DefaultPagesEventNames, PagesAnalyticsConfig, Visitor } from '../models';
import { PagesAnalyticsEvent } from '../models';
import { PageViewEvent } from '../models';
import { calculateSeed } from './CalculateSeed';
import { ConversionTrackingReporter } from './ConversionTrackingReporter';

const DEFAULT_DOMAIN_PAGES = 'www.yext-pixel.com';
const PRODUCT_NAME = 'sites';
const ENDPOINT = 'store_pagespixel';

enum urlParamNames {
  BusinessId = 'businessids',
  Product = 'product',
  SiteId = 'siteId',
  IsStaging = 'isStaging',
  CacheBuster = 'v',
  UrlPath = 'pageurl',
  Referrer = 'pagesReferrer',
  EventType = 'eventType',
  PageSetId = 'pageSetId',
  EntityInternalId = 'ids',
  DirectoryId = 'directoryId',
  SearchId = 'searchId',
  StaticPageId = 'staticPageId',
  PageType = 'pageType',
  VisitorId = 'visitorId',
  VisitorMethod = 'visitorIdMethod',
}

const eventTypeNameMapping = new Map<string, string>();
eventTypeNameMapping.set(DefaultPagesEventNames.PageView, 'pageview');
eventTypeNameMapping.set(DefaultPagesEventNames.CTA, 'calltoactionclick');
eventTypeNameMapping.set(DefaultPagesEventNames.PhoneCall, 'phonecall');
eventTypeNameMapping.set(DefaultPagesEventNames.DrivingDirection, 'drivingdirection');
eventTypeNameMapping.set(DefaultPagesEventNames.Website, 'clicktowebsite');

function getEventName(name: string): string {
  const mappedName = eventTypeNameMapping.get(name);
  if (typeof mappedName === 'string') {
    return mappedName;
  }
  return name;
}

/**
 * Responsible for reporting Pages Analytics Events
 *
 * @public
 */
export class PagesAnalyticsReporter implements PagesAnalyticsService{
  private _visitor: Visitor |undefined;
  private _debug: boolean|undefined;
  private _conversionTrackingEnabled: boolean|undefined;
  private _cookieID: string|undefined;
  private readonly _conversionTracker: ConversionTrackingReporter;
  private _hasTrackedListings: boolean;
  private readonly _pageUrl: URL;
  constructor(private config: PagesAnalyticsConfig,
              private httpRequesterService: HttpRequesterService) {
    this.setVisitor(config.visitor);
    this._debug = config.debug;
    this._conversionTracker = new ConversionTrackingReporter(this.httpRequesterService, this._debug);
    this._hasTrackedListings = false;
    try {
      this._pageUrl = new URL(config.pageUrl);
    } catch {
      throw new Error(`pageUrl property must be a valid URL, was: '${config.pageUrl}'`);
    }
  }

  /**
   * Prints event details to the console for debugging of analytics events as they fire.
   * @param event - the PagesAnalyticsEvent that will be printed
   */
  private printEvent(event: PagesAnalyticsEvent): void {
    if (!this._debug) return;
    console.log(
      `%c[YextAnalytics]%c- Tracked Pages event: ${event.eventType}`,
      'background: white; color: blue;',
      '',
    );
  }

  /**
   * Converts config and PagesAnalyticsEvent into url parameters for sending to API
   * @param event - PagesAnalyticsEvent to transform into URLSearchParams
   */
  private urlParameters(event: PagesAnalyticsEvent): URLSearchParams {
    const params = new URLSearchParams();
    params.set(urlParamNames.BusinessId, this.config.businessId.toString());
    params.set(urlParamNames.Product, PRODUCT_NAME);
    params.set(urlParamNames.SiteId, this.config.siteId.toString());
    params.set(urlParamNames.IsStaging, (!this.config.production).toString());
    params.set(urlParamNames.EventType, getEventName(event.eventType));
    params.set(urlParamNames.PageType, this.config.pageType.name);

    if (this.config.pageType.name === 'entity') {
      params.set(urlParamNames.PageSetId, this.config.pageType.pageSetId);
      params.set(urlParamNames.EntityInternalId, this.config.pageType.id.toString());
    } else if (this.config.pageType.name === 'directory') {
      params.set(urlParamNames.DirectoryId, this.config.pageType.directoryId);
      params.set(urlParamNames.EntityInternalId, this.config.pageType.id.toString());
    } else if (this.config.pageType.name === 'locator') {
      params.set(urlParamNames.SearchId, this.config.pageType.searchId);
    } else if (urlParamNames.StaticPageId in this.config.pageType){
      params.set(urlParamNames.StaticPageId, this.config.pageType.staticPageId);
    }

    params.set(urlParamNames.CacheBuster, calculateSeed().toString());
    params.set(urlParamNames.UrlPath, this._pageUrl.pathname);
    params.set(urlParamNames.Referrer, this.config.referrer);

    if (this._conversionTrackingEnabled && this._cookieID) {
      params.set(COOKIE_PARAM, this._cookieID);
    }

    if (this._visitor) {
      params.set(urlParamNames.VisitorId, this._visitor.id);
      if (this._visitor.idMethod) params.set(urlParamNames.VisitorMethod, this._visitor.idMethod);
    }

    return params;
  }

  /** {@inheritDoc PagesAnalyticsService.pageView} */
  async pageView(): Promise<void> {
    const sourceValue = this._pageUrl.searchParams.get(LISTINGS_SOURCE_PARAM);

    if (this._conversionTrackingEnabled
      && this._cookieID
      && !this._hasTrackedListings
      && sourceValue) {
      await this._conversionTracker.trackListings({
        cookieId: this._cookieID,
        location: this._pageUrl.toString(),
        source: sourceValue,
      });
      this._hasTrackedListings = true;
    }
    return this.track(PageViewEvent);
  }

  /**
   * returns the endpoint to hit depending on whether conversion tracking is enabled
   * @private
   */
  private endpoint(): string {
    if (this._conversionTrackingEnabled) {
      return `https://${DEFAULT_CONVERSION_TRACKING_DOMAIN}/${ENDPOINT}`;
    }
    return `https://${DEFAULT_DOMAIN_PAGES}/${ENDPOINT}`;
  }

  /** {@inheritDoc PagesAnalyticsService.setDebugEnabled} */
  async track(event: PagesAnalyticsEvent, conversionInfo?: ConversionDetails): Promise<void> {
    /** TODO: need to evaluate that the event name is valid, I think there are restrictions in the characters
      * that are accepted
      */
    const url = new URL(this.endpoint());
    url.search = this.urlParameters(event).toString();
    const res = await this.httpRequesterService.get(url.toString());
    // modern browsers won't let us access the status because of CORS
    // https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
    if (res.status !== 200 && !(res.type == 'opaque' || res.type == 'opaqueredirect')) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
    this.printEvent(event);

    if (this._conversionTrackingEnabled && this._cookieID && conversionInfo) {
      await this._conversionTracker.trackConversion({
        cid: conversionInfo.cid,
        cv: conversionInfo.cv,
        cookieId: this._cookieID,
        location: this._pageUrl.toString(),
      });
    }
  }

  /** {@inheritDoc PagesAnalyticsService.setDebugEnabled} */
  setDebugEnabled(enabled: boolean): void {
    this._debug = enabled;
    if (this._conversionTracker) {
      this._conversionTracker.setDebugEnabled(enabled);
    }
  }

  /** {@inheritDoc PagesAnalyticsService.setVisitor} */
  setVisitor(visitor: Visitor | undefined): void {
    this._visitor = visitor;
  }

  /** {@inheritDoc PagesAnalyticsService.setConversionTrackingEnabled} */
  setConversionTrackingEnabled(enabled: boolean, cookieId: string): void {
    this._conversionTrackingEnabled = enabled;
    this._cookieID = cookieId;
  }
}

