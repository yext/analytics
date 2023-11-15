import { reportBrowserAnalytics } from '../src/index';
import { AnalyticsEventReporter } from '../src/AnalyticsEventReporter'; // replace with actual import path

describe('reportBrowserAnalytics', () => {
  let reportSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock window['analyticsEventPayload']
    (global as any).window = {};

    // Mock report method
    reportSpy = jest.spyOn(AnalyticsEventReporter.prototype, 'report');
    reportSpy.mockResolvedValue('report');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a promise that resolves when payload is present', async () => {
    const mockPayload = [
      ['config', { key: 'apiKey' }],
      ['payload', { bot: false }]
    ];
    (global as any).window['analyticsEventPayload'] = mockPayload;

    const result = await reportBrowserAnalytics();

    expect(result).toBe('report');
    expect(reportSpy).toHaveBeenCalled();
  });

  it('should return a promise that rejects when analyticeEvenPayload is not present in window', async () => {
    (global as any).window['analyticsEventPayload'] = undefined;

    await expect(reportBrowserAnalytics()).rejects.toEqual('No payload found.');
  });
});
