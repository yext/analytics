import { PagesAnalyticsReporter } from '../../src/infra/PagesAnalyticsReporter';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';

beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
});

it('The static page page view URL is constructed correctly', () => {
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      staticPageId: 'My Page Set',
      name: 'static',
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);

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

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
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
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockErrorHttpRequesterService(errMsg));
  const resPromise = reporter.pageView();
  expect(resPromise).rejects.toEqual(new Error(errMsg));
});

it('should track entity pages', () => {
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
    pageType: {
      name: 'directory',
      directoryId: 'My Directory Page Set',
      id: 1,
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
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

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track locator pages', () => {
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'locator',
      searchId: 'My Locator Page Set',
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
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

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should track custom events', () => {
  const eventName = 'my_event_type_name';

  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);
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

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should use set the visitor', () => {
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);

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

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

it('should use conversion tracking endpoint and set cookie', () => {
  const reporter = new PagesAnalyticsReporter({
    pageType: {
      name: 'static',
      staticPageId: 'My Page Set',
    },
    referrer: 'https://www.google.com',
    path: '/foo/bar',
    businessId: 0,
    production: false,
    siteId: 0
  }, mockHttpRequesterService);

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

  console.log(expectedUrl.toString());
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});