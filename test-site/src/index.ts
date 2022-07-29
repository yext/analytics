import {CtaClick, PagesAnalyticsConfig, provideAnalytics, providePagesAnalytics} from '@yext/analytics';
import { provideConversionTrackingAnalytics } from '../../src';

const analytics = provideAnalytics({
  experienceKey: 'slanswers',
  experienceVersion: 'PRODUCTION',
  businessId: 3350634,
  debug: true,
});

export function fireClickEvent() {
  fireAnalyticsEvent({
    type: 'CTA_CLICK',
    entityId: '1',
    verticalKey: 'people',
    searcher: 'VERTICAL',
    queryId: '95751527-9db6-4859-8278-60d1c060b6c0'
  });
}

export function fireClickEventWithError() {
  fireAnalyticsEvent({
    type: 'CTA_CLICK',
    queryId: '95751527-9db6-4859-8278-60d1c060b6c0'
  });
}

function fireAnalyticsEvent(event) {
  analytics
    .report(event)
    .then(() => console.log('success!'))
    .catch(err => console.error(err));
}

const pages = providePagesAnalytics({
  pageType: {
    name: 'static',
    staticPageId: 'turtlehead-tacos',
  },
  pagesReferrer: 'https://www.google.com',
  path: '/foo/bar',
  businessId: 3350634,
  production: false,
  siteId: 25317,
  debug: true,
});

export function firePageView() {
  pages.pageView();
}

export function firePagesCTA() {
  pages.track(CtaClick);
}

const conversions = provideConversionTrackingAnalytics(true);

export function fireConversion(value?: number) {
  conversions.trackConversion({cid: 'fd61ce31-43ca-41ce-a68d-f6b540b80556', cv: value.toString()});
}

export function fireListings() {
  conversions.trackListings({source: '1_NjE0MzM5Mi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D', location: 'location/04500'});
}
