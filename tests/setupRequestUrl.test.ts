import { setupRequestUrl } from '../src/setupRequestUrl';

describe('setUpRequestUrl Test', () => {
  it('should set url correctly for env: prod, region: US', () => {
    const resultUrl = setupRequestUrl('PRODUCTION', 'US');
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: EU', () => {
    const resultUrl = setupRequestUrl('PRODUCTION', 'EU');
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: sbx, region: US', () => {
    const resultUrl = setupRequestUrl('SANDBOX', 'US');
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should throw error for env: sbx, region: EU', () => {
    try {
      setupRequestUrl('SANDBOX', 'EU');
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe(
        'Sandbox environment is not available in the EU region.'
      );
    }
  });

  it('should set url correctly with no arguments passed in', () => {
    const resultUrl = setupRequestUrl();
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no env argument passed in', () => {
    const resultUrl = setupRequestUrl(undefined, 'EU');
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no region argument passed in', () => {
    const resultUrl = setupRequestUrl('SANDBOX', undefined);
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });
});
