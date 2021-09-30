import { provideAnalytics, AnalyticsEvent, AnalyticsResponse } from '@yext/answers-analytics';

const analytics = provideAnalytics({
  experienceKey: 'rosetest',
  experienceVersion: 'PRODUCTION',
  businessId: 123,
});

export function fireAnalyticsEvent(): AnalyticsResponse {
  const event = new AnalyticsEvent('CTA_CLICK');
  return analytics.report(event);
}