import {PagesAnalyticsConfig} from '../../src/models/AnalyticsConfig';
import {HttpRequesterService} from '../../src/services';
import {PagesAnalyticsReporter} from '../../src/infra/PagesAnalyticsReporter';
import 'isomorphic-fetch';


const config: PagesAnalyticsConfig = {
  businessId: 12345,
  pageSetId: 'MyPageSet',
  pagesReferrer: null,
  pageurl: null,
  production: false,
  siteId: 0,
};

const mockHttpRequesterService: HttpRequesterService = {
  post: jest.fn(() => Promise.resolve(new Response())),
  get: jest.fn(() => Promise.resolve(new Response())),
};

class MockDate extends Date {
  static now(): number {
    return 1234567889;
  }
}

const MockMath = Object.assign(Math, {
  random(): number {
    return 12345;
  }
});

it('The PageView URL is constructed correctly', () => {
  // const mockWindow = Object.create(Window);
  // delete mockWindow.location;
  // mockWindow.location = new URL('http://www.example.com');
  // mockWindow.document.referer = 'http://www.google.com';

  const reporter = new PagesAnalyticsReporter(config, mockHttpRequesterService);
  reporter.pageView();
  const expectedUrl = '';
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(expectedUrl, expect.anything());
});