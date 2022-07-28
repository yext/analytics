import { HttpRequesterService, PagesAnalyticsService } from '../services';
import {PagesAnalyticsConfig, Visitor} from '../models';
import {PagesAnalyticsEvent} from '../models/pages/events/PagesAnalyticsEvent';
import {PageViewEvent} from '../models/pages';

const DEFAULT_DOMAIN_PAGES = 'https://www.yext-pixel.com';
const PRODUCT_NAME = 'storepages';

// TODO: Implement conversion tracking

enum urlParamNames {
  BusinessId = 'businessId',
  Product = 'product',
  SiteId = 'siteId',
  IsStaging = 'isStaging',
  CacheBuster = 'v',
  UrlPath = 'pageurl',
  Referrer = 'pagesReferrer',
  EventType = 'eventType',
  PageSetId = 'pageSetId',
  EntityInternalId = 'id',
  DirectoryId = 'directoryId',
  SearchId = 'searchId',
  StaticPageId = 'staticPageId',
  PageType = 'pageType',
}

/**
 * Responsible for reporting Pages Analytics Events
 *
 * @public
 */
export class PagesAnalyticsReporter implements PagesAnalyticsService{
  private _visitor: Visitor |undefined;
  private _debug: boolean;
  constructor(private config: PagesAnalyticsConfig,
              private httpRequesterService: HttpRequesterService,
              private debug: boolean = false) {
    this.setVisitor(config.visitor);
    this._debug = config.debug;
  }

  /**
   * Get a random number to use as a cache buster in analytics pixel URLs
   * @returns number
   */
  private static seed(): number {
    return Date.now() + Math.floor(1000 * Math.random());
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
    params.set(urlParamNames.EventType, event.eventType);
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

    params.set(urlParamNames.CacheBuster, PagesAnalyticsReporter.seed().toString());
    params.set(urlParamNames.UrlPath, this.config.path);
    params.set(urlParamNames.Referrer, this.config.pagesReferrer);

    return params;
  }

  /** {@inheritDoc PagesAnalyticsService.pageView} */
  async pageView(): Promise<void> {
    return this.track(PageViewEvent);
  }

  /** {@inheritDoc PagesAnalyticsService.setDebugEnabled} */
  async track(event: PagesAnalyticsEvent): Promise<void> {
    /** TODO: need to evaluate that the event name is valid, I think there are restrictions in the characters
      * that are accepted
      */
    const urlStr = `${DEFAULT_DOMAIN_PAGES}/store_pagespixel`;
    const url = new URL(urlStr);
    url.search = this.urlParameters(event).toString();
    const res = await this.httpRequesterService.get(url.toString());
    if (res.status !== 200) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
    this.printEvent(event);
  }

  /** {@inheritDoc PagesAnalyticsService.setDebugEnabled} */
  setDebugEnabled(enabled: boolean): void {
    this._debug = enabled;
  }

  /** {@inheritDoc PagesAnalyticsService.setVisitor} */
  setVisitor(visitor: Visitor | undefined): void {
    this._visitor = visitor;
  }
}

