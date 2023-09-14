import { AnalyticsConfig } from '../src/AnalyticsConfig';
import { AnalyticsEventReporter } from '../src/AnalyticsEventReporter';
import { RegionEnum } from '../src/Region';
import { postWithBeacon, postWithFetch, useBeacon } from '../src/post';
import { EnvironmentEnum } from '../src/Environment';
import { getOrSetupSessionId } from '../src/setupSessionId';
import { AnalyticsEventService } from '../src/AnalyticsEventService';

jest.mock('../src/post');
jest.mock('../src/setupSessionId');

it('Invalid config with no authorization field', () => {
  expect(() => new AnalyticsEventReporter({})).toThrowError(
    'Provide one and only one of API Key or Bearer Token.'
  );
  const InvalidConfig: AnalyticsConfig = {
    key: undefined,
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig)).toThrowError(
    'Provide one and only one of API Key or Bearer Token.'
  );
});

it('Invalid config with both authorization field', () => {
  const InvalidConfig: AnalyticsConfig = {
    key: 'mock-api-key',
    bearer: 'mock-bearer-token',
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig)).toThrowError(
    'Provide one and only one of API Key or Bearer Token.'
  );
});

it('Valid config will not throw error', () => {
  const configwithAPI: AnalyticsConfig = {
    key: 'mock-api-key',
  };
  expect(() => new AnalyticsEventReporter(configwithAPI)).not.toThrow();

  const configwithBearer: AnalyticsConfig = {
    bearer: 'mock-bearer-token',
  };

  expect(() => new AnalyticsEventReporter(configwithBearer)).not.toThrow();
});

describe('Test report function', () => {
  const mockPostWithBeacon = postWithBeacon as jest.MockedFunction<
    typeof postWithBeacon
  >;
  const mockPostWithFetch = postWithFetch as jest.MockedFunction<
    typeof postWithFetch
  >;
  const mockUseBeacon = useBeacon as jest.MockedFunction<typeof useBeacon>;

  afterEach(() => {
    mockPostWithBeacon.mockClear();
    mockPostWithFetch.mockClear();
    mockUseBeacon.mockClear();
  });

  it('should call post with correct fields, report should return true if post returns true', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      },
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

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
      action: 'C_CUSTOM_ACTION',
      destinationUrl: 'https://google.com',
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual(true);
    /** Expect merge to have completed correctly, the url to be constructed correctly,
    and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'C_CUSTOM_ACTION',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
        },
        referrerUrl: 'https://yext.com',
        destinationUrl: 'https://google.com',
        count: 5,
      }
    );
  });

  it(
    'should call postWithFetch with correct fields, ' +
      'report should return success json if post returns successful',
    async () => {
      mockPostWithFetch.mockResolvedValue({
        ok: true,
        status: 202,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ id: 1111 }),
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
        text: jest.fn(),
      });
      mockUseBeacon.mockReturnValueOnce(false);

      const config: AnalyticsConfig = {
        bearer: 'bearerToken',
        env: EnvironmentEnum.Sandbox,
      };
      const reporter = new AnalyticsEventReporter(config).with({
        action: 'c_lowercase_custom_action',
        referrerUrl: 'https://yext.com',
        count: 5,
      });

      const res = await reporter.report({
        destinationUrl: 'https://google.com',
        referrerUrl: null,
      });

      // Expect Successful Response
      expect(res).toEqual({ id: 1111 });
      /** Expect merge to have completed correctly (with referrerUrl being removed),
       * the url to be constructed correctly defaulting to US,
       * and the clientSdk and authorization to be added to the request body in the correct format. **/
      expect(mockPostWithFetch).toHaveBeenCalledWith(
        'https://sbx.us.yextevents.com/accounts/me/events',
        {
          action: 'c_lowercase_custom_action',
          authorization: 'Bearer bearerToken',
          clientSdk: {
            ANALYTICS: '1.0.0-beta.0',
          },
          destinationUrl: 'https://google.com',
          count: 5,
        }
      );
    }
  );

  it('call post with correct fields, report should return error json if post returns an error', async () => {
    const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<
      typeof getOrSetupSessionId
    >;

    mockSetupSessionId.mockImplementation(() => 'ULID1234');

    mockPostWithFetch.mockResolvedValue({
      ok: true,
      status: 401,
      statusText: 'Unauthorized request',
      json: jest
        .fn()
        .mockResolvedValue({ id: 1111, errors: ['Unauthorized request'] }),
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
      text: jest.fn(),
    });
    mockUseBeacon.mockReturnValueOnce(false);

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
    expect(res).toEqual({ id: 1111, errors: ['Unauthorized request'] });
    // Expect getOrSetupSessionId to be called as sessionTrackingEnabled is set to true
    expect(mockSetupSessionId).toHaveBeenCalled();
    /** Expect merge to have completed correctly,
     * the url to be constructed correctly defaulting to Production,
     * authorization to be from the config and not overriden by reprt(),
     * and sessionId and clientSdk to be added to the request body in the correct format. **/
    expect(mockPostWithFetch).toHaveBeenCalledWith(
      'https://us.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'Bearer bearerToken',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
          chat: '1.0.1.0',
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
        sessionId: 'ULID1234',
      }
    );
  });

  it('call post with correct fields and set sessionId undefined if session tracking disabled', async () => {
    const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<
      typeof getOrSetupSessionId
    >;

    mockPostWithFetch.mockResolvedValue({
      ok: true,
      status: 202,
      statusText: 'Unauthorized request',
      json: jest.fn().mockResolvedValue({ id: 1111 }),
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
      text: jest.fn(),
    });
    mockUseBeacon.mockReturnValueOnce(false);

    const config: AnalyticsConfig = {
      bearer: 'bearerToken',
      sessionTrackingEnabled: false,
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5,
      sessionId: 'ULID1234',
    });

    const res = await reporter.report({
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0',
      },
    });

    // Expect successful response
    expect(res).toEqual({ id: 1111 });
    // Expect getOrSetupSessionId to not be called as session tracking disabled
    expect(mockSetupSessionId).toHaveBeenCalledTimes(0);
    /** Expect merge to have completed correctly,
     * the url to be constructed correctly defaulting to Production,
     * authorization to be from the config and not overriden by reprt(),
     * and sessionId set to undefined,
     * and clientSdk to be added to the request body in the correct format. **/
    expect(mockPostWithFetch).toHaveBeenCalledWith(
      'https://us.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'Bearer bearerToken',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
          chat: '1.0.1.0',
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
        sessionId: undefined,
      }
    );
  });

  it('calling report with no argument should result in the request body coming from with()', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      },
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

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

    const res = await reporter.report();

    // Expect true to be returned for beacon request
    expect(res).toEqual(true);
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
        },
        referrerUrl: 'https://yext.com',
        count: 5,
      }
    );
  });

  it('report with an argument with no with() should result in request body coming from report', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      },
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false,
    };

    const service: AnalyticsEventService = new AnalyticsEventReporter(config);

    const res = await service.report({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5,
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual(true);
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
        },
        referrerUrl: 'https://yext.com',
        count: 5,
      }
    );
  });

  it('report with no argument and no with() should result in invalid request body and error', async () => {
    mockPostWithFetch.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: jest.fn().mockResolvedValue({}),
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
      text: jest.fn(),
    });

    const navigator = {
      userAgent: 'Chrome',
      sendBeacon: () => {
        return false;
      },
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });
    mockPostWithBeacon.mockReturnValue(false);

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: true,
    };

    const service: AnalyticsEventService = new AnalyticsEventReporter(config);

    try {
      await service.report({});
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Events API responded with 400: Bad Request');
    }

    /** Expect merge to have completed correctly, but the request
     * body to be invalid as action was never added **/
    expect(mockPostWithFetch).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
        },
      }
    );
  });

  it('multiple with() should result in unique objects with unique values', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      },
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true,
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false,
    };

    const reporter1 = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5,
    });

    const res1 = await reporter1.report();
    // Expect true to be returned for beacon request
    expect(res1).toEqual(true);
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
        },
        referrerUrl: 'https://yext.com',
        count: 5,
      }
    );

    const reporter2 = reporter1.with({
      action: 'APPLY',
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0',
      },
    });

    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const res2 = await reporter2.report();

    // Expect true to be returned for beacon request
    expect(res2).toEqual(true);
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'APPLY',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.0',
          chat: '1.0.1.0',
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
      }
    );
  });
});
