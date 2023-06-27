import { SearchAnalyticsReporter } from '../../src/infra/SearchAnalyticsReporter';
import { SearchAnalyticsConfig } from '../../src';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';

const config: SearchAnalyticsConfig = {
  experienceKey: 'yext',
  experienceVersion: 'PRODUCTION',
  businessId: 123
};

it('The URL is constructed correctly', () => {
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(config, mockService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const expectedUrl = `https://www.us.yextevents.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly for EU', () => {
  const configWithEURegion: SearchAnalyticsConfig = {
    ...config,
    region: 'EU'
  };
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(configWithEURegion, mockService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const expectedUrl
    = `https://www.eu.yextevents.com/realtimeanalytics/data/answers/${configWithEURegion.businessId}`;
  expect(mockService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly for Sandbox', () => {
  const configWithSandboxEnv: SearchAnalyticsConfig = {
    ...config,
    env: 'SANDBOX'
  };
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(configWithSandboxEnv, mockService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const expectedUrl
    = `https://www.sbx.us.yextevents.com/realtimeanalytics/data/answers/${configWithSandboxEnv.businessId}`;
  expect(mockService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly with custom domains', () => {
  const configWithCustomDomain = {
    ...config,
    domain: 'https://yext.com'
  };
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(configWithCustomDomain, mockService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1'});
  const expectedUrl = `https://yext.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The data is structured properly', () => {
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(config, mockService);
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
  expect(mockService.post).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('Additional params are sent properly', () => {
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(config, mockService);
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
  expect(mockService.post).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('Returns a resolved promise after a successful report', () => {
  expect.assertions(1);
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter(config, mockService);
  const resPromise = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(resPromise).resolves.toEqual(undefined);
});

it('Performs a promise rejection when the API responds with an error', () => {
  expect.assertions(1);
  const errMsg = 'So we put a fail in your fail so you can facepalm while you facepalm';
  const analyticsReporter = new SearchAnalyticsReporter(config, mockErrorHttpRequesterService(errMsg));
  const resPromise = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(resPromise).rejects.toEqual(new Error(errMsg));
});

it('Visitor is set and passed properly', () => {
  const visitorParam = { visitor: { id: '123'} };
  const mockService = mockHttpRequesterService();
  const analyticsReporter = new SearchAnalyticsReporter({...config, ...visitorParam}, mockService);
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
  expect(mockService.post).toHaveBeenLastCalledWith(expect.anything(),
    expectedDataWithVisitor);

  analyticsReporter.setVisitor(undefined);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(mockService.post).toHaveBeenLastCalledWith(expect.anything(), { data });
});
