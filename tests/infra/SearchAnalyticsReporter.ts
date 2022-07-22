import { AnalyticsReporter } from '../../src/infra/AnalyticsReporter';
import { SearchAnalyticsConfig } from '../../src/models';
import { HttpRequesterService } from '../../src/services/HttpRequesterService';
import 'isomorphic-fetch';

const config: SearchAnalyticsConfig = {
  experienceKey: 'yext',
  experienceVersion: 'PRODUCTION',
  businessId: 123
};

const mockHttpRequesterService: HttpRequesterService = {
  post: jest.fn(() => Promise.resolve(new Response())),
  get: jest.fn(() => Promise.resolve(new Response())),
};

it('The URL is constructed correctly', () => {
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  const expectedUrl = `https://answers.yext-pixel.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});

it('The URL is constructed correctly with custom domains', () => {
  const configWithCustomDomain = {
    ...config,
    domain: 'https://yext.com'
  };
  const analyticsReporter = new AnalyticsReporter(configWithCustomDomain, mockHttpRequesterService);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1'});
  const expectedUrl = `https://yext.com/realtimeanalytics/data/answers/${config.businessId}`;
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
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
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expect.anything(), expectedData);
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
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expect.anything(), expectedData);
});

it('Returns a resolved promise after a successful report', () => {
  expect.assertions(1);
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  const resPromise = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(resPromise).resolves.toEqual(undefined);
});

it('Performs a promise rejection when the API responds with an error', () => {
  expect.assertions(1);
  const errMsg = 'So we put a fail in your fail so you can facepalm while you facepalm';
  const mockHttpRequesterService: HttpRequesterService = {
    post: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
    get: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
  };
  const analyticsReporter = new AnalyticsReporter(config, mockHttpRequesterService);
  const resPromise = analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(resPromise).rejects.toEqual(new Error(errMsg));
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
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expect.anything(),
    expectedDataWithVisitor);

  analyticsReporter.setVisitor(undefined);
  analyticsReporter.report({ type: 'SCROLL_TO_BOTTOM_OF_PAGE', queryId: '1' });
  expect(mockHttpRequesterService.post).toHaveBeenLastCalledWith(expect.anything(), { data });
});
