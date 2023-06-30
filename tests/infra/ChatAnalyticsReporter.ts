import { ChatAnalyticsReporter } from '../../src/infra/ChatAnalyticsReporter';
import { ChatAnalyticsConfig, ChatEventPayLoad, EventAPIResponse } from '../../src/models';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';
import * as ulidLib from 'ulid';

const prodConfig: ChatAnalyticsConfig = {
  apiKey: 'mock-api-key',
  env: 'PRODUCTION',
};

const expectedHeaders: Record<string, string> = {
  Authorization: 'KEY mock-api-key',
  'Content-Type': 'application/json',
};

const payload: ChatEventPayLoad = {
  action: 'ADD_TO_CART',
  chat: {
    botId: 'dummy-bot',
  },
};

const mockedResponse: EventAPIResponse = { id: '12345' };

it('should send events to the prod domain when configured', async () => {
  const mockService = mockHttpRequesterService(mockedResponse);
  const reporter = new ChatAnalyticsReporter(prodConfig, mockService);
  const expectedUrl ='https://www.us.yextevents.com/accounts/me/events';
  const response = await reporter.report(payload);
  expect(response).toEqual(mockedResponse);
  expect(mockService.post).toBeCalledWith(
    expectedUrl,
    payload,
    expectedHeaders
  );
});

it('should send events to the custom endpoint when configured', async () => {
  const mockService = mockHttpRequesterService(mockedResponse);
  const expectedUrl = 'https://my-custom-endpoint.com';
  const reporter = new ChatAnalyticsReporter({
    apiKey: 'mock-api-key',
    endpoint: expectedUrl,
  }, mockService);
  const response = await reporter.report(payload);
  expect(response).toEqual(mockedResponse);
  expect(mockService.post).toBeCalledWith(
    expectedUrl,
    payload,
    expectedHeaders
  );
});

it('throws an error on an invalid env and region', () => {
  const errMessage = 'mocked error message';
  const mockService = mockErrorHttpRequesterService(errMessage);
  expect(() => new ChatAnalyticsReporter({
    apiKey: 'dummy key',
    env: 'SANDBOX',
    region: 'EU'
  }, mockService))
    .toThrow('The combination of the environment: "SANDBOX", region: "EU",'
      + 'and conversionTrackingEnabled: "false" is unsupported.');
});


it('Performs a promise rejection when the API responds with an error', async () => {
  const errors: EventAPIResponse = {
    id: 'some-id',
    errors: ['test 1', 'test 2']
  };
  const mockService = mockErrorHttpRequesterService(JSON.stringify(errors));
  const analyticsReporter = new ChatAnalyticsReporter(prodConfig, mockService);
  const resPromise = analyticsReporter.report({
    action: 'ADD_TO_CART',
    chat: {
      botId: 'dummy bot'
    }
  });
  await expect(resPromise).rejects.toThrowError('Events API responded with 400: Bad Request'
  +'\nError: test 1.\nError: test 2.');
});

it('converts timestamps to ISO strings', async () => {
  const mockService = mockHttpRequesterService(mockedResponse);
  const reporter = new ChatAnalyticsReporter(prodConfig, mockService);
  const response = await reporter.report({
    action: 'ADD_TO_CART',
    timestamp: new Date(2020, 1, 1),
    chat: {
      botId: 'dummy bot'
    }
  });
  expect(response).toEqual(mockedResponse);
});

describe('sessionId handling', () => {
  beforeEach(() => {
    jest.spyOn(ulidLib, 'ulid').mockReturnValue('mocked-ulid-value');
  });

  it('generates sessionId for payload when sessionTrackingEnabled is true', async () => {
    const mockService = mockHttpRequesterService(mockedResponse);
    const reporter = new ChatAnalyticsReporter({
      ...prodConfig,
      sessionTrackingEnabled: true,
    }, mockService);
    await reporter.report(payload);
    expect(mockService.post).toBeCalledWith(
      expect.any(String),
      {
        ...payload,
        sessionId: 'mocked-ulid-value',
      },
      expect.any(Object)
    );
  });

  it('uses provided sessionId for payload when sessionTrackingEnabled is true', async () => {
    const mockService = mockHttpRequesterService(mockedResponse);
    const reporter = new ChatAnalyticsReporter({
      ...prodConfig,
      sessionTrackingEnabled: true,
    }, mockService);
    await reporter.report({
      ...payload,
      sessionId: 'custom-ulid-value',
    });
    expect(mockService.post).toBeCalledWith(
      expect.any(String),
      {
        ...payload,
        sessionId: 'custom-ulid-value',
      },
      expect.any(Object)
    );
  });

  it('omits sessionId from payload when sessionTrackingEnabled is false (by default)', async () => {
    const mockService = mockHttpRequesterService(mockedResponse);

    let reporter = new ChatAnalyticsReporter(prodConfig, mockService);
    await reporter.report(payload);
    expect(mockService.post).toBeCalledWith(
      expect.any(String),
      payload,
      expect.any(Object)
    );

    reporter = new ChatAnalyticsReporter(prodConfig, mockService);
    await reporter.report({
      ...payload,
      sessionId: 'custom-ulid-value',
    });
    expect(mockService.post).toBeCalledWith(
      expect.any(String),
      payload,
      expect.any(Object)
    );
  });
});