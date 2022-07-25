import {PagesAnalyticsConfig} from '../../src/models/AnalyticsConfig';
import {HttpRequesterService} from '../../src/services';
import {PagesAnalyticsReporter} from '../../src/infra/PagesAnalyticsReporter';
import 'isomorphic-fetch';


const baseConfig: PagesAnalyticsConfig = {
  isPages: true,
  product: 'storepages',
  businessId: 12345,
  featureId: 'My Page Set',
  pageType: 'static',
  production: false,
  siteId: 0
};

let windowSpy;

const mockHttpRequesterService: HttpRequesterService = {
  post: jest.fn(() => Promise.resolve(new Response())),
  get: jest.fn(() => Promise.resolve(new Response())),
};
beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
  windowSpy = jest.spyOn(window, 'window', 'get');
});

afterEach(() => {
  windowSpy.mockRestore();
});

const baseGlobals = {
  location: {
    href: 'http://www.example.com/foo/bar',
    pathname: '/foo/bar',
  },
  document: {
    referrer: 'http://www.google.com',
  }
};

it('The static page page view URL is constructed correctly', () => {
  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const reporter = new PagesAnalyticsReporter(baseConfig, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '12345');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('staticPageId', 'My%20Page%20Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Ffoo%2Fbar');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('Should handle http errors properly', () => {
  expect.assertions(1);
  const errMsg = 'Invalid IDs';
  const errorMockHttpRequesterService: HttpRequesterService = {
    post: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
    get: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
  };

  const reporter = new PagesAnalyticsReporter(baseConfig, errorMockHttpRequesterService);
  const resPromise = reporter.pageView();
  expect(resPromise).rejects.toEqual(new Error(errMsg));
});

it('should throw an error if no ids are passed for an entity page config', () => {
  expect.assertions(1);
  const config: PagesAnalyticsConfig = {
    isPages: true,
    businessId: 0,
    featureId: '',
    pageType: 'entity',
    product: 'storepages',
    production: false,
    siteId: 0
  };
  const reporter = new PagesAnalyticsReporter(config, mockHttpRequesterService);
  const resPromise = reporter.pageView();
  expect(resPromise).rejects.toEqual(new Error('entity ids are required for entity page sets'));
});

it('should track entity pages', () => {
  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const entityConfig: PagesAnalyticsConfig = {
    isPages: true,
    businessId: 0,
    featureId: 'My Page Set',
    pageType: 'entity',
    product: 'storepages',
    production: false,
    siteId: 0,
    ids: [1],
  };

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('pageSetId', 'My%20Page%20Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Ffoo%2Fbar');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');
  expectedUrl.searchParams.set('ids', '1');

  const reporter = new PagesAnalyticsReporter(entityConfig, mockHttpRequesterService);
  reporter.pageView();

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track directory pages', () => {
  const config: PagesAnalyticsConfig = {
    isPages: true,
    businessId: 0,
    featureId: 'My Directory Page Set',
    pageType: 'directory',
    product: 'storepages',
    production: false,
    siteId: 0,
  };

  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const reporter = new PagesAnalyticsReporter(config, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('directoryId', 'My%20Directory%20Page%20Set');
  // TODO: figure out if we need to pass the directoryPath parameter or not, it's weirdly constructed today
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Ffoo%2Fbar');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track locator pages', () => {
  const config: PagesAnalyticsConfig = {
    isPages: true,
    businessId: 0,
    featureId: 'My Locator Page Set',
    pageType: 'locator',
    product: 'storepages',
    production: false,
    siteId: 0
  };

  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const reporter = new PagesAnalyticsReporter(config, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('searchId', 'My%20Locator%20Page%20Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Ffoo%2Fbar');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should respect config overrides', () => {
  const config: PagesAnalyticsConfig = {
    isPages: true,
    businessId: 0,
    featureId: 'My Directory Page Set',
    pageType: 'static',
    product: 'storepages',
    production: false,
    siteId: 0,
    pagesReferrer: 'http://www.example.com', //baseGlobals.document.referrer = 'https://www.google.com'
    path: '/bar/foo' // baseGlobals.window.pathname = '/foo/bar'
  };

  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const reporter = new PagesAnalyticsReporter(config, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('staticPageId', 'My%20Directory%20Page%20Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Fbar%2Ffoo');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.example.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});


it('should track click events', () => {
  windowSpy.mockImplementation(() => {
    return baseGlobals;
  });

  const eventName = 'my_event_type_name';

  const reporter = new PagesAnalyticsReporter(baseConfig, mockHttpRequesterService);
  reporter.userInteraction(eventName);

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '12345');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', eventName);
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('staticPageId', 'My%20Page%20Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '%2Ffoo%2Fbar');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});
