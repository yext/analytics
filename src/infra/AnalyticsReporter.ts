/**
 * Responsible for reporting Pages & Search Analytics Events
 */
import { HttpRequesterService, SearchAnalyticsService, PagesAnalyticsService } from '../services';
import {AnalyticsConfig, SearchAnalyticsEvent, Visitor} from '../models';
import { PagesAnalyticsReporter } from './PagesAnalyticsReporter';
import { SearchAnalyticsReporter } from './SearchAnalyticsReporter';

export class AnalyticsReporter implements PagesAnalyticsService, SearchAnalyticsService {
  private searchReporter: SearchAnalyticsReporter;
  private pagesReporter: PagesAnalyticsReporter;
  constructor(private config: AnalyticsConfig,
              private httpRequesterService: HttpRequesterService) {
    this.searchReporter = new SearchAnalyticsReporter({
      businessId: config.businessId,
      experienceKey: config.experienceKey,
      experienceVersion: config.experienceVersion,
    }, httpRequesterService);

    this.pagesReporter = new PagesAnalyticsReporter({
      businessId: config.businessId,
      featureId: config.featureId,
      ids: config.ids,
      pageType: config.pageType,
      pagesReferrer: config.pagesReferrer,
      path: config.path,
      product: config.product,
      production: config.production,
      siteId: config.siteId,
    }, httpRequesterService)
  }

  async report(event: SearchAnalyticsEvent): Promise<void> {
    return this.searchReporter.report(event);
  }

  setVisitor(visitor: Visitor | undefined): void {
    this.searchReporter.setVisitor(visitor);
  }

  async pageView(): Promise<void> {
    return this.pagesReporter.pageView();
  }

  async userInteraction(eventName: string): Promise<void> {
    return this.pagesReporter.userInteraction(eventName);
  }
}