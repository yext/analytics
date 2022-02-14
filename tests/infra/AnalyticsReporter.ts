import { AnalyticsReporter } from '../../src/infra/AnalyticsReporter';
import { AnalyticsConfig } from '../../src/models';
import { HttpRequesterService } from '../../src/services/HttpRequesterService';

const config: AnalyticsConfig = {
  experienceKey: 'yext',
  experienceVersion: 'PRODUCTION',
  businessId: 123
};

const mockHttpRequesterService: HttpRequesterService = { beacon: jest.fn(() => true) };

it('The URL is constructed correctly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const expectedUrl = `https://answers.yext-pixel.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly with custom domains', () => {
  const configWithCustomDomain = {
    ...config,
    domain: 'https://yext.com'
  };
  const analyticsReporter = new AnalyticsReporter(configWithCustomDomain, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1'});
  const expectedUrl = `https://yext.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The data is structured properly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1'});
  const expectedData = {
    data: {
      businessId: 123,
      eventType: 'SCROLL_TO_BOTTOM_OF_PAGE',
      experienceKey: 'yext',
      experienceVersion: 'PRODUCTION',
      queryId: '1'
    }
  };
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('Additional params are sent properly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  const additionalRequestAttributes = {
    ytag: 123
  };
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' }, additionalRequestAttributes);
  const expectedData = {
    data: {
      businessId: 123,
      eventType: 'SCROLL_TO_BOTTOM_OF_PAGE',
      experienceKey: 'yext',
      experienceVersion: 'PRODUCTION',
      queryId: '1'
    },
    ...additionalRequestAttributes
  };
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('A status of "success" is returned for successful beacons', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  const metadata = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(metadata).toEqual({ status: 'success' });
});

it('A status of "error" is returned for unsuccessful beacons', () => {
  const mockHttpRequesterService: HttpRequesterService = { beacon: jest.fn(() => false) };
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  const metadata = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(metadata).toEqual({ status: 'error', message: expect.anything() });
});

it('Visitor is set and passed properly', () => {
  const visitorParam = { visitor: { id: '123'} };
  const analyticsReporter = new AnalyticsReporter({...config, ...visitorParam}, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const data = {
    businessId: 123,
    eventType: 'SCROLL_TO_BOTTOM_OF_PAGE',
    experienceKey: 'yext',
    experienceVersion: 'PRODUCTION',
    queryId: '1'
  };
  const expectedDataWithVisitor = {
    data: {
      ...data,
      ...visitorParam
    }
  };
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(),
    expectedDataWithVisitor);

  analyticsReporter.setVisitor();
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(mockHttpRequesterService.beacon).toHaveBeenLastCalledWith(expect.anything(), { data });
});
