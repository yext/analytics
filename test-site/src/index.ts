import { provideAnalytics } from '@yext/analytics';

const analytics = provideAnalytics({
  experienceKey: 'slanswers',
  experienceVersion: 'PRODUCTION',
  businessId: 3350634,
});

export function fireAnalyticsEvent() {
  analytics.report({
    type: "CTA_CLICK",
    entityId: '1',
    verticalKey: 'people',
    searcher: 'VERTICAL',
    queryId: '95751527-9db6-4859-8278-60d1c060b6c0'
  });
}