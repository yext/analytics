import {PagesAnalyticsConfig} from '../../src/models/AnalyticsConfig';
import {HttpRequesterService} from '../../src/services';
import {PagesAnalyticsReporter} from '../../src/infra/PagesAnalyticsReporter';
import 'isomorphic-fetch';


const baseConfig: PagesAnalyticsConfig = {
  businessId: 12345,
  pageSetId: 'MyPageSet',
  production: false,
  siteId: 0,
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

it('The PageView URL is constructed correctly', () => {
  windowSpy.mockImplementation(() => {
    return {
      location: {
        href: 'http://www.example.com',
      },
      document: {
        referrer: 'http://www.google.com',
      }
    };
  });

  const reporter = new PagesAnalyticsReporter(baseConfig, mockHttpRequesterService);
  reporter.pageView();

  const expectedUrl = new URL('https://www.yext-pixel.com/store_pagespixel');

  expectedUrl.searchParams.set('businessId', '12345');
  expectedUrl.searchParams.set('product', 'storepages');
  expectedUrl.searchParams.set('eventType', 'pageview');
  expectedUrl.searchParams.set('siteId', '0');
  expectedUrl.searchParams.set('isStaging', 'true');
  expectedUrl.searchParams.set('v', '1001');
  expectedUrl.searchParams.set('pageurl', 'http%3A%2F%2Fwww.example.com');
  expectedUrl.searchParams.set('pagesReferrer','http%3A%2F%2Fwww.google.com');

  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl.toString());
});

// TODO: implement entity id tracking
// TODO: implement directory tracking test
// TODO: implement search tracking test
// TODO: implement overridden referrer / pages url test
// TODO: implement click event
// TODO: implement error check test