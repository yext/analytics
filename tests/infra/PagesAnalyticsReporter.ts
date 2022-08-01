import { PagesAnalyticsReporter } from '../../src/infra/PagesAnalyticsReporter';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';

beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
});

it('The static page page view URL is constructed correctly', () => {
  const httpRequesterService = mockHttpRequesterService();
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      staticPageId: 'My Page Set',
      name: 'static',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);

  reporter.pageView();
  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'static');
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('Should handle http errors properly', () => {
  expect.assertions(1);
  const errMsg = 'Invalid IDs';

  const reporter = new PagesAnalyticsReporter({
    pageType: {
      staticPageId: 'My Page Set',
      name: 'static',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockErrorHttpRequesterService(errMsg));
  const resPromise = reporter.pageView();
  expect(resPromise).rejects.toEqual(new Error(errMsg));
});

it('should track entity pages', () => {
  const httpRequesterService = mockHttpRequesterService();
  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');
  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'entity');
  expectedUrl.searchParams.set('pageSetId', 'My Page Set');
  expectedUrl.searchParams.set('id', '1');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'entity',
      pageSetId: 'My Page Set',
      id: 1,
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);

  reporter.pageView();
  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track directory pages', () => {
  const httpRequesterService = mockHttpRequesterService();
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'directory',
      directoryId: 'My Directory Page Set',
      id: 1,
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'directory');
  expectedUrl.searchParams.set('directoryId', 'My Directory Page Set');
  expectedUrl.searchParams.set('id', '1');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track locator pages', () => {
  const httpRequesterService = mockHttpRequesterService();
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'locator',
      searchId: 'My Locator Page Set',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');
  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'locator');
  expectedUrl.searchParams.set('searchId', 'My Locator Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track custom events', () => {
  const httpRequesterService = mockHttpRequesterService();
  const eventName = 'my_event_type_name';
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);
  reporter.track({eventType: eventName});

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', eventName);
  expectedUrl.searchParams.set('pageType', 'static');
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should use set the visitor', () => {
  const httpRequesterService = mockHttpRequesterService();
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);

  reporter.setVisitor({
    id: 'foo',
    method: 'bar',
  });

  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'static');
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');
  expectedUrl.searchParams.set('visitorId', 'foo');
  expectedUrl.searchParams.set('visitorIdMethod', 'bar');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should use conversion tracking endpoint and set cookie', () => {
  const httpRequesterService = mockHttpRequesterService();
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);

  reporter.setVisitor({
    id: 'foo',
    method: 'bar',
  });

  reporter.setConversionTrackingEnabled(true, '123456');
  reporter.pageView();

  const expectedUrl = new URL('https://realtimeanalytics.yext.com/store_pagespixel');

  expectedUrl.searchParams.set('businessids', '0');
  expectedUrl.searchParams.set('product', 'sites');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('pageType', 'static');
  expectedUrl.searchParams.set('staticPageId', 'My Page Set');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', '/foo/bar');
  expectedUrl.searchParams.set('pagesReferrer','https://www.google.com');
  expectedUrl.searchParams.set('_yfpc', '123456');
  expectedUrl.searchParams.set('visitorId', 'foo');
  expectedUrl.searchParams.set('visitorIdMethod', 'bar');

  expect(httpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should throw an error if the pageUrl property is invalid', () => {
  const httpRequesterService = mockHttpRequesterService();
  expect.assertions(1);
  const errMsg = 'pageUrl property must be a valid URL, was: \'foo/bar\'';
  const thisShouldThrow = () => {
    new PagesAnalyticsReporter({
      pageType: {
        staticPageId: 'My Page Set',
        name: 'static',
      },
      referrer: 'https://www.google.com',
      pageUrl: 'foo/bar',
      businessId: 0,
      production: false,
      siteId: 0
    }, httpRequesterService);
  };

  expect(thisShouldThrow).toThrow(errMsg);
});

it('should track listings with a pageview', async () => {
  const httpRequesterService = mockHttpRequesterService();

  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    pageUrl: 'https://www.foobar.com/foo/bar?y_source=123455',
    businessId: 0,
    production: false,
    siteId: 0
  }, httpRequesterService);

  reporter.setConversionTrackingEnabled(true, '123456');
  await reporter.pageView();

  const listingsUrl = new URL('https://realtimeanalytics.yext.com/listings');
  listingsUrl.searchParams.set('y_source', '123455');
  listingsUrl.searchParams.set('location', 'https://www.foobar.com/foo/bar?y_source=123455');
  listingsUrl.searchParams.set('_yfpc', '123456');
  listingsUrl.searchParams.set('v', '1001');

  expect(httpRequesterService.get).toHaveBeenNthCalledWith(1, listingsUrl.toString());

  const pageViewUrl = new URL('https://realtimeanalytics.yext.com/store_pagespixel');
  pageViewUrl.searchParams.set('businessids', '0');
  pageViewUrl.searchParams.set('product', 'sites');
  pageViewUrl.searchParams.set('siteId', '0');
  pageViewUrl.searchParams.set('isStaging', 'true');
  pageViewUrl.searchParams.set('eventType', 'pageview');
  pageViewUrl.searchParams.set('pageType', 'static');
  pageViewUrl.searchParams.set('staticPageId', 'My Page Set');
  pageViewUrl.searchParams.set('v', '1001');
  pageViewUrl.searchParams.set('pageurl', '/foo/bar');
  pageViewUrl.searchParams.set('pagesReferrer','https://www.google.com');

  pageViewUrl.searchParams.set('_yfpc', '123456');
  expect(httpRequesterService.get).toHaveBeenNthCalledWith(2, pageViewUrl.toString());
});