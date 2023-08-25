import { AnalyticsConfig } from '../src/AnalyticsConfig';
import { AnalyticsEventReporter } from '../src/AnalyticsEventReporter';
import { RegionEnum } from '../src/Region';
import { post } from '../src/post';
import { EnvironmentEnum } from '../src/Environment';
import { getOrSetupSessionId } from '../src/setupSessionId';

jest.mock('../src/post');
jest.mock('../src/setupSessionId');

it('Invalid config with no authorization field', () => {
  expect(() => new AnalyticsEventReporter({}))
    .toThrowError('Provide one and only one of API Key or Bearer Token.');
  const InvalidConfig: AnalyticsConfig = {
    key: undefined
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig))
    .toThrowError('Provide one and only one of API Key or Bearer Token.');
});

it('Invalid config with both authorization field', () => {
  const InvalidConfig: AnalyticsConfig = {
    key: 'mock-api-key',
    bearer: 'mock-bearer-token'
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig))
    .toThrowError('Provide one and only one of API Key or Bearer Token.');
});

it('Valid config will not throw error', () => {
  const configwithAPI: AnalyticsConfig = {
    key: 'mock-api-key'

  };
  expect(() => new AnalyticsEventReporter(configwithAPI)).not.toThrow();

  const configwithBearer: AnalyticsConfig = {
    bearer: 'mock-bearer-token'
  };

  expect(() => new AnalyticsEventReporter(configwithBearer)).not.toThrow();

});

describe('Test report function', () => {
  const mockPost = post as jest.MockedFunction<typeof post>;

  afterEach(() => {
    mockPost.mockClear();
  });

  it('should call post with correct fields, report should return true if post returns true', async () => {
    mockPost.mockResolvedValue(true as any);

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false,
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5,
    });

    const res = await reporter.report({
      action: 'APPLY',
      destinationUrl: 'https://google.com',
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual(true);
    /** Expect merge to have completed correctly, the url to be constructed correctly,
    and the clientSdk and authorization to be added to the request body in the correct format.. **/
    expect(mockPost).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'APPLY',
        authorization: 'KEY validKey',
        clientSdk: {
          '@yext/analytics': '1.0.0-beta.0'
        },
        referrerUrl: 'https://yext.com',
        destinationUrl: 'https://google.com',
        count: 5,
      },
      false);
  });

  it('should call post with correct fields, report should return success json if post returns successful',
    async () => {
      mockPost.mockResolvedValue({
        ok: true,
        status: 202,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({id: 1111}),
        redirected: false,
        type: 'basic',
        url: 'https://example.com',
        clone: jest.fn(),
        headers: new Headers(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn()
      });

      const config: AnalyticsConfig = {
        bearer: 'bearerToken',
        env: EnvironmentEnum.Sandbox,
      };
      const reporter = new AnalyticsEventReporter(config).with({
        action: 'ADD_TO_CART',
        referrerUrl: 'https://yext.com',
        count: 5,
      });

      const res = await reporter.report({
        destinationUrl: 'https://google.com',
        referrerUrl: null,
      });

      // Expect Successful Response
      expect(res).toEqual({id: 1111});
      /** Expect merge to have completed correctly (with referrerUrl being removed),
       * the url to be constructed correctly defaulting to US,
       * and the clientSdk and authorization to be added to the request body in the correct format. **/
      expect(mockPost).toHaveBeenCalledWith(
        'https://sbx.us.yextevents.com/accounts/me/events',
        {
          action: 'ADD_TO_CART',
          authorization: 'Bearer bearerToken',
          clientSdk: {
            '@yext/analytics': '1.0.0-beta.0'
          },
          destinationUrl: 'https://google.com',
          count: 5,
        },
        undefined);
    });

  it('should call post with correct fields, report should return error json if post returns an error',
    async () => {
      const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<typeof getOrSetupSessionId>;

      mockSetupSessionId.mockImplementation( () => 'ULID1234');

      mockPost.mockResolvedValue({
        ok: true,
        status: 401,
        statusText: 'Unauthorized request',
        json: jest.fn().mockResolvedValue({id: 1111, errors: ['Unauthorized request']}),
        redirected: false,
        type: 'basic',
        url: 'https://example.com',
        clone: jest.fn(),
        headers: new Headers(),
        body: null,
        bodyUsed: false,
        arrayBuffer: jest.fn(),
        blob: jest.fn(),
        formData: jest.fn(),
        text: jest.fn()
      });

      const config: AnalyticsConfig = {
        bearer: 'bearerToken',
        sessionTrackingEnabled: true,
      };
      const reporter = new AnalyticsEventReporter(config).with({
        action: 'ADD_TO_CART',
        referrerUrl: 'https://yext.com',
        count: 5,
      });

      const res = await reporter.report({
        authorization: 'Bearer shouldNotUpdate',
        destinationUrl: 'https://google.com',
        clientSdk: {
          chat: '1.0.1.0',
        },
      });

      // Expect Unauthorized response
      expect(res).toEqual({id: 1111, errors: ['Unauthorized request']});
      // Expect getOrSetupSessionId to be called as sessionTrackingEnabled is set to true
      expect(mockSetupSessionId).toHaveBeenCalled();
      /** Expect merge to have completed correctly,
       * the url to be constructed correctly defaulting to Production,
       * authorization to be from the config and not overriden by reprt(),
       * and sessionId and clientSdk to be added to the request body in the correct format. **/
      expect(mockPost).toHaveBeenCalledWith(
        'https://us.yextevents.com/accounts/me/events',
        {
          action: 'ADD_TO_CART',
          authorization: 'Bearer bearerToken',
          clientSdk: {
            '@yext/analytics': '1.0.0-beta.0',
            chat: '1.0.1.0',
          },
          destinationUrl: 'https://google.com',
          referrerUrl: 'https://yext.com',
          count: 5,
          sessionId: 'ULID1234'
        },
        undefined);
    });
});


