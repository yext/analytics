import { AnalyticsReporter } from '../../src/infra/AnalyticsReporter';
import { AnalyticsConfig, AnalyticsEvent } from '../../src/models';
import { RequesterService } from '../../src/services/RequesterService';

const config: AnalyticsConfig = {
  experienceKey: 'yext',
  experienceVersion: 'PRODUCTION',
  businessId: 123
}

const mockRequesterService : RequesterService = { beacon: jest.fn(() => true) };

it('The URL is constructed correctly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  analyticsReporter.report(event);
  const expectedUrl = `https://answers.yext-pixel.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockRequesterService.beacon).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly with custom domains', () => {
  const configWithCustomDomain = {
    ...config,
    domain: 'https://yext.com'
  };
  const analyticsReporter = new AnalyticsReporter(configWithCustomDomain, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  analyticsReporter.report(event);
  const expectedUrl = `https://yext.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockRequesterService.beacon).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The data is structured properly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  analyticsReporter.report(event);
  const expectedData = {
    data: {
      businessId: 123,
      eventType: 'THUMBS_UP',
      experienceKey: 'yext',
      experienceVersion: 'PRODUCTION'
    }
  };
  expect(mockRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('Additional params are sent properly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  const additionalRequestAttributes = {
    ytag: 123
  };
  analyticsReporter.report(event, additionalRequestAttributes);
  const expectedData = {
    data: {
      businessId: 123,
      eventType: 'THUMBS_UP',
      experienceKey: 'yext',
      experienceVersion: 'PRODUCTION'
    },
    ...additionalRequestAttributes
  };
  expect(mockRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('A status of "success" is returned for successful beacons', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  const metadata = analyticsReporter.report(event);
  expect(metadata).toEqual({ status: 'success' });
});

it('A status of "error" is returned for unsuccessful beacons', () => {
  const mockRequesterService : RequesterService = { beacon: jest.fn(() => false) };
  const analyticsReporter = new AnalyticsReporter(config, mockRequesterService);
  const event = new AnalyticsEvent('THUMBS_UP');
  const metadata = analyticsReporter.report(event);
  expect(metadata).toEqual({ status: 'error', message: expect.anything() });
});