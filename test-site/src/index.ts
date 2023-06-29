import {CtaClick, provideAnalytics, providePagesAnalytics, provideChatAnalytics} from '@yext/analytics';
import { CookieManager, provideConversionTrackingAnalytics } from '../../src';

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
    name: 'entity',
    pageSetId: 'location',
    id: 18718615,
  },
  referrer: 'https://www.google.com',
  pageUrl: 'https://www.pagesanalyticstesting.com/location/11291?y_source=123353131212312312',
  businessId: 3350634,
  production: false,
  siteId: 40659,
  debug: true,
});

const cookieManager = new CookieManager();
const cookieId = cookieManager.setAndGetYextCookie();
let enableConversionTracking = true;
pages.setConversionTrackingEnabled(enableConversionTracking, cookieId);

export function firePageView() {
  pages.pageView();
}

export function firePagesCTA() {
  pages.track(CtaClick, {cid: 'fd61ce31-43ca-41ce-a68d-f6b540b80556'});
}

const conversions = provideConversionTrackingAnalytics(true);

export function toggleConversionTracking() {
  enableConversionTracking = !enableConversionTracking;
  pages.setConversionTrackingEnabled(enableConversionTracking, cookieId);
}

export function fireConversion(value?: number) {
  conversions.trackConversion({
    cookieId: cookieId,
    cid: 'fd61ce31-43ca-41ce-a68d-f6b540b80556',
    cv: value.toString(),
    location: window.location.href,
  });
}

export function fireListings() {
  conversions.trackListings({
    cookieId: cookieId,
    source: '1_NjE0MzM5Mi03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D',
    location: 'location/04500'
  });
}

const chat = provideChatAnalytics({
  apiKey: process.env.CHAT_API_KEY,
});

export function fireChatEvent() {
  chat.report({
    action: "CHAT_LINK_CLICK",
    chat: {
      botId: "analytics-test-bot"
    }
  })
}