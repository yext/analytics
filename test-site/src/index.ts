import { provideAnalytics, AnalyticsEvent } from '@yext/answers-analytics';

const analytics = provideAnalytics({
  experienceKey: 'rosetest',
  experienceVersion: 'PRODUCTION',
  businessId: 123,
})

export function fireAnalyticsEvent () {
  const event = new AnalyticsEvent('CTA_CLICK');
  analytics.report(event);
}