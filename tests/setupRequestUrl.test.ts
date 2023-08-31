import { EnvironmentEnum } from '../src/Environment';
import { RegionEnum } from '../src/Region';
import { setupRequestUrl } from '../src/setupRequestUrl';

describe('setUpRequestUrl Test', () => {
  it('should set url correctly for env: prod, region: us using their Enums', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Production, RegionEnum.US);
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: us using their string literals', () => {
    const resultUrl = setupRequestUrl('PRODUCTION', 'us');
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: eu using their Enums', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Production, RegionEnum.EU);
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: eu using their string literals', () => {
    const resultUrl = setupRequestUrl('PRODUCTION', 'eu');
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: sbx, region: us using their Enums', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Sandbox, RegionEnum.US);
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: sbx, region: us using their string literals', () => {
    const resultUrl = setupRequestUrl('SANDBOX', 'us');
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should throw error for env: sbx, region: eu using their Enums', () => {
    try {
      setupRequestUrl(EnvironmentEnum.Sandbox, RegionEnum.EU);
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Sandbox environment is not available in the EU region.');
    }
  });

  it('should throw error for env: sbx, region: eu using their string literals', () => {
    try {
      setupRequestUrl('SANDBOX', 'eu');
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Sandbox environment is not available in the EU region.');
    }
  });

  it('should set url correctly with no arguments passed in', () => {
    const resultUrl = setupRequestUrl();
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no env argument passed in using its Enum', () => {
    const resultUrl = setupRequestUrl(undefined, RegionEnum.EU);
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no env argument passed in using their string literals', () => {
    const resultUrl = setupRequestUrl(undefined, 'eu');
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no region argument passed in using its Enum', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Sandbox, undefined);
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly with no region argument passed in using their string literals', () => {
    const resultUrl = setupRequestUrl('SANDBOX', undefined);
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });
});
