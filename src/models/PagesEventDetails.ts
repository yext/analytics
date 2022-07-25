import {PagesAnalyticsConfig} from './AnalyticsConfig';
import {PagesEvent} from '../models';

/**
 * A fully detailed Pages Event
 */
export class PagesEventDetails implements PagesAnalyticsConfig, PagesEvent {
  public readonly isPages: true;
  public businessId: number;
  public eventType: string;
  public siteId: number;
  public production: boolean;
  public ids?: number[];
  public featureId: string;
  public product: 'storepages' |'sites';
  public path: string;
  public pagesReferrer: string;
  public pageType: 'entity'|'directory'|'locator'|'static';

  constructor(config: PagesAnalyticsConfig, event: PagesEvent) {
    this.eventType = event.eventType;
    this.product = 'storepages';
    this.siteId = config.siteId;
    this.businessId = config.businessId;
    this.production = config.production;
    this.ids = config.ids;
    this.pageType = config.pageType;

    if (this.pageType === 'entity' && !this.ids) {
      throw new Error('entity ids are required for entity page sets');
    }

    this.featureId = config.featureId;
    this.pagesReferrer = config.pagesReferrer ? config.pagesReferrer : window.document.referrer;
    this.path = config.path ? config.path : window.location.pathname;
  }

  pageTypeParam(): string {
    switch (this.pageType) {
      case 'directory':
        return 'directoryId';
      case 'entity':
        return 'pageSetId';
      case 'locator':
        return 'searchId';
      case 'static':
        return 'staticPageId';
    }
  }

  /**
   * Get a random number to use as a cache buster in analytics pixel URLs
   * @returns {number}
   */
  seed(): number {
    return Date.now() + Math.floor(1000 * Math.random());
  }

  urlParameters(): URLSearchParams {
    const params = new URLSearchParams();
    params.set('businessId', this.businessId.toString());
    params.set('product', this.product);
    params.set('eventType', this.eventType);
    params.set('siteId', this.siteId.toString());
    params.set('isStaging', (!this.production).toString());
    params.set(this.pageTypeParam(), encodeURIComponent(this.featureId));
    params.set('v', this.seed().toString());
    params.set('pageurl', encodeURIComponent(this.path));
    params.set('pagesReferrer', encodeURIComponent(this.pagesReferrer));

    if (this.ids) {
      params.set('ids', this.ids.map(id => id.toString()).join(','));
    }

    return params;
  }
}