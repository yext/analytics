import { EnvironmentEnum } from '../src/Environment';
import { EventPayload } from '../src/EventPayload';
import { RegionEnum } from '../src/Region';
import setUpRequestUrl, { setupRequestUrl } from '../src/setupRequestUrl';

describe('setUpRequestUrl Test', () => {
  it('should set url correctly for env: prod, region: us', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Production, RegionEnum.US);
    const expectedUrl = 'https://us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: eu', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Production, RegionEnum.EU);
    const expectedUrl = 'https://eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: us', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Sandbox, RegionEnum.US);
    const expectedUrl = 'https://sbx.us.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });

  it('should set url correctly for env: prod, region: us', () => {
    const resultUrl = setupRequestUrl(EnvironmentEnum.Sandbox, RegionEnum.EU);
    const expectedUrl = 'https://sbx.eu.yextevents.com/accounts/me/events';

    expect(resultUrl).toEqual(expectedUrl);
  });
});