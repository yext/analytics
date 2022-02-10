const { provideAnalytics, AnalyticsEvent } = require('@yext/analytics');

const analytics = provideAnalytics({
  experienceKey: 'rosetest',
  experienceVersion: 'PRODUCTION',
  businessId: 123,
});

const event = new AnalyticsEvent('CTA_CLICK');
const response = analytics.report(event);
console.log(response);