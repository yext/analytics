import { ChatAnalyticsReporter } from '../../src/infra/ChatAnalyticsReporter';
import { ChatAnalyticsConfig, EventAPIResponse } from '../../src/models';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';

const prodConfig: ChatAnalyticsConfig = {
  apiKey: 'mock-api-key',
  env: 'PRODUCTION',
};

const mockedResponse: EventAPIResponse = { id: '12345' };

it('should send events to the prod domain when configured', async () => {
  const mockService = mockHttpRequesterService(mockedResponse);
  const reporter = new ChatAnalyticsReporter(prodConfig, mockService);
  const expectedUrl ='https://www.us.yextevents.com/accounts/me/events';
  expect(reporter.endpoint).toBe(expectedUrl);
  const response = await reporter.report({
    action: 'ADD_TO_CART',
    chat: {
      botId: 'davish-playground',
    },
  });
  expect(response).toEqual(mockedResponse);
});

it('throws an error on an invalid env and region', () => {
  const errMessage = 'mocked error message';
  const mockService = mockErrorHttpRequesterService(errMessage);
  expect(() => new ChatAnalyticsReporter({
    apiKey: 'dummy key',
    env: 'SANDBOX',
    region: 'EU'
  }, mockService))
    .toThrow('The combination of the environment "SANDBOX" and the region "EU" is unsupported.');
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

it('should convert timestamps to ISO strings', async () => {
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