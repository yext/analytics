import { ConversionTrackingReporter } from '../../src/infra/ConversionTrackingReporter';
import { mockErrorHttpRequesterService, mockHttpRequesterService } from '../../src/services/__mocks__/MockHttpRequesterService';


beforeEach(() => {
  // will produce a v parameter == 1001 from the seed() function
  jest.spyOn(global.Math, 'random').mockReturnValue(1);
  jest.spyOn(global.Date, 'now').mockReturnValue(1);
});

it('should not set empty parameters', () => {
  const mockService = mockHttpRequesterService();
  const reporter = new ConversionTrackingReporter(mockService);
  reporter.trackConversion({
    cid: '12345',
    cookieId: '54321',
  });
  expect(mockService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/conversiontracking/conversion?cid=12345&_yfpc=54321&v=1001',
  );
});

it('should set all parameters passed', () => {
  const mockService = mockHttpRequesterService();
  const reporter = new ConversionTrackingReporter(mockService);
  reporter.trackConversion({
    cid: '12345',
    cookieId: '54321',
    referrer: 'http://www.google.com/foo/bar',
  });
  expect(mockService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/conversiontracking/conversion?cid=12345&_yfpc=54321&referrer=http%3A%2F%2Fwww.google.com%2Ffoo%2Fbar&v=1001',
  );
});

it('should handle an error', () => {
  const message = 'You Failed, Try Again';
  const conversionReporter = new ConversionTrackingReporter(mockErrorHttpRequesterService(message));
  const resPromise = conversionReporter.trackConversion({
    cid: '12345',
    cookieId: '54321',
  });
  expect(resPromise).rejects.toEqual(new Error(message));
});

it('should track listings', () => {
  const mockService = mockHttpRequesterService();
  const reporter = new ConversionTrackingReporter(mockService);
  reporter.trackListings({
    cookieId: '54321',
    source: 'foo',
    location: 'https://www.example.com/my/foo/page'
  });
  expect(mockService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/listings?y_source=foo&location=https%3A%2F%2Fwww.example.com%2Fmy%2Ffoo%2Fpage&_yfpc=54321&v=1001',
  );
});

it('should track listings with more details', () => {
  const mockService = mockHttpRequesterService();
  const reporter = new ConversionTrackingReporter(mockService);
  reporter.trackListings({
    source: 'foo',
    location: 'https://www.example.com/my/foo/page',
    cookieId: '54321',
    referrer: 'http://www.google.com/foo/bar',
  });
  expect(mockService.get).toHaveBeenLastCalledWith(
    'https://realtimeanalytics.yext.com/listings?y_source=foo&location=https%3A%2F%2Fwww.example.com%2Fmy%2Ffoo%2Fpage&_yfpc=54321&referrer=http%3A%2F%2Fwww.google.com%2Ffoo%2Fbar&v=1001',
  );
});