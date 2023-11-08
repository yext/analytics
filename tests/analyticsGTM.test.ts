// analyticsGTM.test.ts
import { analyticsGTM } from '../src/index';
import { AnalyticsEventReporter } from '../src/AnalyticsEventReporter'; // replace with actual import path

describe('analyticsGTM', () => {
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
      [{ key: 'apiKey' }, { key: 'config' }],
      [{ bot: false }, { key: 'data' }]
    ];
    (global as any).window['analyticsEventPayload'] = mockPayload;

    const result = await analyticsGTM();

    expect(result).toBe('report');
    expect(reportSpy).toHaveBeenCalled();
  });

  it('should return a promise that rejects when analyticeEvenPayload is not present in window', async () => {
    (global as any).window['analyticsEventPayload'] = undefined;

    await expect(analyticsGTM()).rejects.toEqual('No payload found.');
  });

  it('should return a promise that rejects when payload is present but config is not', async () => {
    const mockPayload = [
      [{ bot: false }, { key: 'data' }],
      [null, { key: 'config' }]
    ];
    (global as any).window['analyticsEventPayload'] = mockPayload;

    await expect(analyticsGTM()).rejects.toEqual('No config found in payload.');
  });

  it('should return a promise that rejects when config is present but payload is not', async () => {
    const mockPayload = [
      [{ key: 'apiKey' }, { key: 'config' }],
      [null, { key: 'data' }]
    ];
    (global as any).window['analyticsEventPayload'] = mockPayload;

    await expect(analyticsGTM()).rejects.toEqual('No payload found.');
  });
});
