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
    key: undefined
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig)).toThrowError(
    'Provide one and only one of API Key or Bearer Token.'
  );
});

it('Invalid config with both authorization field', () => {
  const InvalidConfig: AnalyticsConfig = {
    key: 'mock-api-key',
    bearer: 'mock-bearer-token'
  };
  expect(() => new AnalyticsEventReporter(InvalidConfig)).toThrowError(
    'Provide one and only one of API Key or Bearer Token.'
  );
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
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    const res = await reporter.report({
      action: 'C_CUSTOM_ACTION',
      destinationUrl: 'https://google.com'
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual('');
    /** Expect merge to have completed correctly, the url to be constructed correctly,
    and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'C_CUSTOM_ACTION',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        },
        referrerUrl: 'https://yext.com',
        destinationUrl: 'https://google.com',
        count: 5
      }
    );
  });

  it(
    'should call postWithFetch with correct fields, ' +
      'report should return success json if post returns successful',
    async () => {
      mockPostWithFetch.mockResolvedValue({ id: 1111 });
      mockUseBeacon.mockReturnValueOnce(false);

      const config: AnalyticsConfig = {
        bearer: 'bearerToken',
        env: EnvironmentEnum.Sandbox
      };
      const reporter = new AnalyticsEventReporter(config).with({
        action: 'c_lowercase_custom_action',
        referrerUrl: 'https://yext.com',
        count: 5
      });

      const res = await reporter.report({
        destinationUrl: 'https://google.com',
        referrerUrl: null
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
            ANALYTICS: '1.0.0-beta.2'
          },
          destinationUrl: 'https://google.com',
          count: 5
        }
      );
    }
  );

  it('call post with correct fields, report return error json if post returns an error', async () => {
    const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<
      typeof getOrSetupSessionId
    >;

    mockSetupSessionId.mockImplementation(() => 'ULID1234');
    mockPostWithFetch.mockRejectedValue({
      id: 1111,
      errors: ['Unauthorized request']
    });
    mockUseBeacon.mockReturnValueOnce(false);

    const config: AnalyticsConfig = {
      bearer: 'bearerToken',
      sessionTrackingEnabled: true
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    const res = await reporter.report({
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0'
      }
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
          ANALYTICS: '1.0.0-beta.2',
          chat: '1.0.1.0'
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
        sessionId: 'ULID1234'
      }
    );
  });
  it('should call post with correct fields, and use the original sessionId', async () => {
    const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<
      typeof getOrSetupSessionId
    >;

    mockSetupSessionId.mockImplementation(() => 'ULID1234');
    mockPostWithFetch.mockRejectedValue({
      id: 1111,
      errors: ['Unauthorized request']
    });
    mockUseBeacon.mockReturnValueOnce(false);

    const config: AnalyticsConfig = {
      bearer: 'bearerToken',
      sessionTrackingEnabled: true
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    const res = await reporter.report({
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0'
      },
      sessionId: 'ULIDORIGINAL'
    });

    // Expect Unauthorized response
    expect(res).toEqual({ id: 1111, errors: ['Unauthorized request'] });
    // Expect getOrSetupSessionId to not be called as sessionId already provided in event payload.
    expect(mockSetupSessionId).toHaveBeenCalledTimes(0);
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
          ANALYTICS: '1.0.0-beta.2',
          chat: '1.0.1.0'
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
        sessionId: 'ULIDORIGINAL'
      }
    );
  });

  it('call post with correct fields and set sessionId undefined if session tracking disabled', async () => {
    const mockSetupSessionId = getOrSetupSessionId as jest.MockedFunction<
      typeof getOrSetupSessionId
    >;
    mockUseBeacon.mockReturnValueOnce(false);
    mockPostWithFetch.mockResolvedValue({ id: 1111 });

    const config: AnalyticsConfig = {
      bearer: 'bearerToken',
      sessionTrackingEnabled: false
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5,
      sessionId: 'ULID1234'
    });

    const res = await reporter.report({
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0'
      }
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
          ANALYTICS: '1.0.0-beta.2',
          chat: '1.0.1.0'
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5,
        sessionId: undefined
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
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    const res = await reporter.report();

    // Expect true to be returned for beacon request
    expect(res).toEqual('');
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        },
        referrerUrl: 'https://yext.com',
        count: 5
      }
    );
  });

  it('call report with an argument with no with() result in request body coming from report', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false
    };

    const service: AnalyticsEventService = new AnalyticsEventReporter(config);

    const res = await service.report({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual('');
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        },
        referrerUrl: 'https://yext.com',
        count: 5
      }
    );
  });

  it('call report with no argument and no with() result in invalid request body and error', async () => {
    mockPostWithBeacon.mockReturnValue(false);
    mockPostWithFetch.mockRejectedValue({ errors: ['Bad Request'] });

    const navigator = {
      userAgent: 'Chrome',
      sendBeacon: () => {
        return false;
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: true
    };

    const service: AnalyticsEventService = new AnalyticsEventReporter(config);

    const res = await service.report({});
    expect(res).toEqual({ errors: ['Bad Request'] });

    /** Expect merge to have completed correctly, but the request
     * body to be invalid as action was never added **/
    expect(mockPostWithFetch).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        }
      }
    );
  });
  it('call report with no argument and no with() result in Failed Beacon Call for beacon', async () => {
    mockPostWithBeacon.mockReturnValue(false);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false
    };

    const service: AnalyticsEventService = new AnalyticsEventReporter(config);

    const res = service.report({});
    await res.catch((e) => expect(e).toMatch('Failed Beacon Call'));

    /** Expect merge to have completed correctly, but the request
     * body to be invalid as action was never added **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        }
      }
    );
  });

  it('call with more than once result in unique objects that can be called with unique values', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false
    };

    const reporter1 = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      referrerUrl: 'https://yext.com',
      count: 5
    });

    const res1 = await reporter1.report();
    // Expect true to be returned for beacon request
    expect(res1).toEqual('');
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'ADD_TO_CART',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2'
        },
        referrerUrl: 'https://yext.com',
        count: 5
      }
    );

    const reporter2 = reporter1.with({
      action: 'APPLY',
      authorization: 'Bearer shouldNotUpdate',
      destinationUrl: 'https://google.com',
      clientSdk: {
        chat: '1.0.1.0'
      }
    });

    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const res2 = await reporter2.report();

    // Expect true to be returned for beacon request
    expect(res2).toEqual('');
    /** Expect merge to have completed correctly, the url to be constructed correctly,
      and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'APPLY',
        authorization: 'KEY validKey',
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2',
          chat: '1.0.1.0'
        },
        destinationUrl: 'https://google.com',
        referrerUrl: 'https://yext.com',
        count: 5
      }
    );
  });

  it('should call post with correct fields - full payload', async () => {
    mockPostWithBeacon.mockReturnValueOnce(true);
    mockUseBeacon.mockReturnValueOnce(true);
    const navigator = {
      userAgent: 'Firefox',
      sendBeacon: () => {
        return true;
      }
    };
    Object.defineProperty(window, 'navigator', {
      value: navigator,
      writable: true
    });

    const config: AnalyticsConfig = {
      key: 'validKey',
      region: RegionEnum.EU,
      forceFetch: false,
      sessionTrackingEnabled: true
    };
    const reporter = new AnalyticsEventReporter(config).with({
      action: 'ADD_TO_CART',
      bot: false,
      browserAgent: {
        browser: 'chrome',
        browserVersion: '1.0.0',
        device: 'desktop',
        deviceClass: 'desktop',
        os: 'windows',
        osVersion: '10',
        userAgent: 'chrome'
      },
      chat: {
        botId: 'botId',
        conversationId: 'conversationId',
        responseId: 'responseId'
      },
      clientSdk: {
        chat: '1.0.0'
      },
      count: 5,
      customTags: {
        customTag: 'customTagValue'
      },
      customValues: {
        customValue: 1
      },
      destinationUrl: 'https://google.com',
      entity: 'entityId',
      internalUser: false,
      ip: {
        address: '1.0.0.0',
        algorithm: 'HASH'
      },
      label: 'label',
      locale: 'en_US',
      location: {
        coordinates: {
          latitude: 1,
          longitude: 1
        }
      },
      nonce: 'nonce',
      pageUrl: 'https://yext.com',
      referrerUrl: 'https://yext.com',
      search: {
        versionNumber: 5,
        isDirectAnswer: false,
        experienceKey: 'experienceKey',
        queryId: 'queryId'
      },
      searchTerm: 'searchTerm',
      sessionId: 'sessionId',
      sites: {
        siteUid: 321,
        template: 'template'
      },
      timestamp: new Date(12, 7),
      value: {
        amount: 1,
        currency: 'USD'
      },
      visitor: {
        'visitor-id': 'visitor-id'
      }
    });

    const res = await reporter.report({
      action: 'C_CUSTOM_ACTION',
      destinationUrl: 'https://google.com'
    });

    // Expect true to be returned for beacon request
    expect(res).toEqual('');
    /** Expect merge to have completed correctly, the url to be constructed correctly,
    and the clientSdk and authorization to be added to the request body in the correct format. **/
    expect(mockPostWithBeacon).toHaveBeenCalledWith(
      'https://eu.yextevents.com/accounts/me/events',
      {
        action: 'C_CUSTOM_ACTION',
        authorization: 'KEY validKey',
        bot: false,
        browserAgent: {
          browser: 'chrome',
          browserVersion: '1.0.0',
          device: 'desktop',
          deviceClass: 'desktop',
          os: 'windows',
          osVersion: '10',
          userAgent: 'chrome'
        },
        chat: {
          botId: 'botId',
          conversationId: 'conversationId',
          responseId: 'responseId'
        },
        clientSdk: {
          ANALYTICS: '1.0.0-beta.2',
          chat: '1.0.0'
        },
        count: 5,
        customTags: {
          customTag: 'customTagValue'
        },
        customValues: {
          customValue: 1
        },
        destinationUrl: 'https://google.com',
        entity: 'entityId',
        internalUser: false,
        ip: {
          address: '1.0.0.0',
          algorithm: 'HASH'
        },
        label: 'label',
        locale: 'en_US',
        location: {
          coordinates: {
            latitude: 1,
            longitude: 1
          }
        },
        nonce: 'nonce',
        pageUrl: 'https://yext.com',
        referrerUrl: 'https://yext.com',
        search: {
          versionNumber: 5,
          isDirectAnswer: false,
          experienceKey: 'experienceKey',
          queryId: 'queryId'
        },
        searchTerm: 'searchTerm',
        sessionId: 'sessionId',
        sites: {
          siteUid: 321,
          template: 'template'
        },
        timestamp: '1912-08-01T05:00:00.000Z',
        value: {
          amount: 1,
          currency: 'USD'
        },
        visitor: {
          'visitor-id': 'visitor-id'
        }
      }
    );
  });
});
