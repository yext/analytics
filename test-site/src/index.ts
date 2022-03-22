import { provideAnalytics } from '@yext/analytics';

const analytics = provideAnalytics({
  experienceKey: 'slanswers',
  experienceVersion: 'PRODUCTION',
  businessId: 3350634,
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