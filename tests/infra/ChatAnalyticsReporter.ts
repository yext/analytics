import { ChatAnalyticsReporter } from '../../src/infra/ChatAnalyticsReporter';
import type ChatAnalyticsConfig from '../../src/models/config/ChatAnalyticsConfig';
import fetchMock from 'jest-fetch-mock';
import { config } from 'dotenv';

config();

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify({ id: '12345' })); // mock response
});

const prodConfig: ChatAnalyticsConfig = {
  apiKey: process.env.PROD_EVENTS_API_KEY || '',
  env: 'PROD',
};

it('should send events to the prod domain when configured', async () => {
  const reporter = new ChatAnalyticsReporter(prodConfig);
  const expectedUrl ='https://www.us.yextevents.com/accounts/me/events';
  expect(reporter.endpoint).toBe(expectedUrl);
  const response = await reporter.report({
    action: 'ADD_TO_CART',
  });
  expect(response.id).toBeDefined();
  expect(response.id).not.toBeNull();
});

it('should be able to send complex events with a chat domain', async () => {
  const reporter = new ChatAnalyticsReporter(prodConfig);
  const response = await reporter.report({
    action: 'ADD_TO_CART',
    chat: {
      botId: 'davish-playground',
    },
  });
  expect(response.id).toBeDefined();
  expect(response.id).not.toBeNull();
});

it('should error when called with a bogus API key', async () => {
  const bogusRepoter = new ChatAnalyticsReporter({
    apiKey: 'bogus',
    env: 'PROD',
  });
  await expect(bogusRepoter.report({ action: 'CHAT_IMPRESSION' })).rejects.toThrow();
});

it('should convert timestamps to ISO strings', async () => {
  const reporter = new ChatAnalyticsReporter(prodConfig);
  const response = await reporter.report({
    action: 'ADD_TO_CART',
    timestamp: new Date(2020, 1, 1),
  });
  expect(response.id).toBeDefined();
  expect(response.id).not.toBeNull();
});