import { provideAnalytics, AnalyticsEvent, AnalyticsResponse } from '@yext/answers-analytics';

const analytics = provideAnalytics({
  experienceKey: 'slanswers',
  experienceVersion: 'PRODUCTION',
  businessId: 3350634,
});

export function fireAnalyticsEvent() {
  const event = new AnalyticsEvent('CTA_CLICK', {
    entityId: 1,
    verticalConfigId: 'people',
    searcher: 'VERTICAL',
    queryId: '95751527-9db6-4859-8278-60d1c060b6c0'
  });
  analytics.report(event);
}