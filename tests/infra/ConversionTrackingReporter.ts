import { ConversionTrackingReporter } from '../../src/infra/ConversionTrackingReporter';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';


beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
});

const reporter = new ConversionTrackingReporter(mockHttpRequesterService);

it('should not set empty parameters', () => {
  reporter.trackConversion({
    cid: '12345',
    firstPartyCookieId: '54321',
  });
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/conversiontracking/conversion?cid=12345&_yfpc=54321&v=1001',
  );
});

it('should set all parameters passed', () => {
  reporter.trackConversion({
    cid: '12345',
    firstPartyCookieId: '54321',
    thirdPartyCookieId: '098765',
    referrer: 'http://www.google.com/foo/bar',
  });
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/conversiontracking/conversion?cid=12345&_yfpc=54321&referrer=http%3A%2F%2Fwww.google.com%2Ffoo%2Fbar&cookieId=098765&v=1001',
  );
});

it('should handle an error', () => {
  const message = 'You Failed, Try Again';
  const conversionReporter = new ConversionTrackingReporter(mockErrorHttpRequesterService(message));
  const resPromise = conversionReporter.trackConversion({
    cid: '12345',
    firstPartyCookieId: '54321',
  });
  expect(resPromise).rejects.toEqual(new Error(message));
});

it('should track listings', () => {
  reporter.trackListings({
    source: 'foo',
    location: 'https://www.example.com/my/foo/page',
  });
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/listings?y_source=foo&location=https%3A%2F%2Fwww.example.com%2Fmy%2Ffoo%2Fpage&v=1001',
  );
});


it('should track listings with more details', () => {
  reporter.trackListings({
    source: 'foo',
    location: 'https://www.example.com/my/foo/page',
    firstPartyCookieId: '54321',
    thirdPartyCookieId: '098765',
    referrer: 'http://www.google.com/foo/bar',
  });
  expect(mockHttpRequesterService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/listings?y_source=foo&location=https%3A%2F%2Fwww.example.com%2Fmy%2Ffoo%2Fpage&referrer=http%3A%2F%2Fwww.google.com%2Ffoo%2Fbar&_yfpc=54321&cookieId=098765&v=1001',
  );
});