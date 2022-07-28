import 'isomorphic-fetch';
import {PagesAnalyticsReporter, HttpRequesterService} from '../../src';

const mockHttpRequesterService: HttpRequesterService = {
  post: jest.fn(() => Promise.resolve(new Response())),
  get: jest.fn(() => Promise.resolve(new Response())),
};
beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
});

it('The static page page view URL is constructed correctly', () => {
  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      staticPageId: 'My Page Set',
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);

  reporter.pageView();
  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'PAGE_VIEW');
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('Should handle http errors properly', () => {
  expect.assertions(1);
  const errMsg = 'Invalid IDs';
  const errorMockHttpRequesterService: HttpRequesterService = {
    post: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
    get: jest.fn(() => Promise.resolve(new Response(errMsg, { status: 400 }))),
  };

  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      staticPageId: 'My Page Set',
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, errorMockHttpRequesterService);
  const resPromise = reporter.pageView();
  expect(resPromise).rejects.toEqual(new Error(errMsg));
});

it('should track entity pages', () => {
  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');
  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'PAGE_VIEW');
  expectedUrl.searchParams.set('pageSetId', 'My Page Set');
  expectedUrl.searchParams.set('id', '1');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      pageSetId: 'My Page Set',
      id: 1,
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);

  reporter.pageView();
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track directory pages', () => {
  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      directoryId: 'My Directory Page Set',
      id: 1,
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'PAGE_VIEW');
  expectedUrl.searchParams.set('directoryId', 'My Directory Page Set');
  expectedUrl.searchParams.set('id', '1');
  // TODO: figure out if we need to pass the directoryPath parameter or not, it's weirdly constructed today
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track locator pages', () => {
  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      searchId: 'My Locator Page Set',
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');
  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'PAGE_VIEW');
  expectedUrl.searchParams.set('searchId', 'My Locator Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track custom events', () => {
  const eventName = 'my_event_type_name';

  const reporter = new PagesAnalyticsReporter({
    debug: false,
    pageType: {
      staticPageId: 'My Page Set',
    },
    pagesReferrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
  reporter.track({eventType: eventName});

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '0');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', eventName);
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});
