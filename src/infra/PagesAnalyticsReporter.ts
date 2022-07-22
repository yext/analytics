import {HttpRequesterService} from '../services';
import {PagesAnalyticsConfig} from '../models/AnalyticsConfig';
import {PagesEvent} from '../models';
import {PagesEventDetails} from '../models/PagesEventDetails';

const DEFAULT_DOMAIN_PAGES = 'https://www.yext-pixel.com';

// TODO: Implement conversion tracking & do not track functionality

/**
 * Responsible for reporting Pages Analytics Events
 */
export class PagesAnalyticsReporter {
  constructor(private config: PagesAnalyticsConfig,
              private httpRequesterService: HttpRequesterService,
              private global: Window=window) {
  }

  async report(event: PagesEvent): Promise<void> {
    const eventDetails = new PagesEventDetails(this.config, event, this.global);
    const urlStr = `${DEFAULT_DOMAIN_PAGES}/store_pagespixel`;
    const url = new URL(urlStr);
    url.search = eventDetails.urlParameters().toString();
    const res = await this.httpRequesterService.get(url.toString());
    if (res.status !== 200) {
      const errorMessage = await res.text();
      throw new Error(errorMessage);
    }
  }

  async pageView(): Promise<void> {
    return this.report({eventType: 'pageview'});
  }

  async click(eventName: string): Promise<void> {
    return this.report({eventType: eventName});
  }
}
