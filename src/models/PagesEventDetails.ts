import {PagesAnalyticsConfig} from '../models/AnalyticsConfig';
import {PagesEvent} from '../models';

/**
 * A fully detailed Pages Event
 */
export class PagesEventDetails implements PagesAnalyticsConfig, PagesEvent {
  public businessId: number;
  public eventType: string;
  public siteId: number;
  public production: boolean;
  public ids?: number[];
  public pageSetId: string;
  readonly product: 'storepages';
  public pageurl: string;
  public pagesReferrer: string;

  constructor(config: PagesAnalyticsConfig, event: PagesEvent, global: Window=window) {
    this.eventType = event.eventType;
    this.product = 'storepages';
    this.siteId = config.siteId;
    this.businessId = config.businessId;
    this.production = config.production;
    this.ids = config.ids;
    this.pageSetId = config.pageSetId;
    this.pagesReferrer = config.pagesReferrer ? config.pagesReferrer : global.document.referrer;
    this.pageurl = config.pageurl ? config.pageurl : global.location.href;
  }

  /**
   * Get a random number to use as a cache buster in analytics pixel URLs
   * @returns {number}
   */
  seed(date: DateConstructor = window.Date,
    math: Math = window.Math,
  ): number {
    return date.now() + math.floor(1000 * math.random());
  }

  urlParameters(): URLSearchParams {
    const params = new URLSearchParams();
    params.set('businessId', this.businessId.toString());
    params.set('product', this.product);
    params.set('eventType', this.eventType);
    params.set('siteId', this.siteId.toString());
    params.set('isStaging', (!this.production).toString());
    if (this.ids) {
      params.set('ids', this.ids.map(id => id.toString()).join(','));
    }
    params.set('v', this.seed().toString());
    params.set('pageurl', encodeURIComponent(this.pageurl));
    params.set('pagesReferrer', encodeURIComponent(this.pagesReferrer));

    return params;
  }
}