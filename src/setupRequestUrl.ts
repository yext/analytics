import { Environment, EnvironmentEnum } from './Environment';
import { Region, RegionEnum } from './Region';

const urlBase = 'yextevents.com/accounts/me/events';

export function setupRequestUrl(env?: Environment, region?: Region): string {
  if (env === EnvironmentEnum.Sandbox && region === RegionEnum.EU) {
    throw new Error('Sandbox environment is not available in the EU region.');
  }
  return 'https://' + (env === EnvironmentEnum.Sandbox ? 'sbx.' : '') + (region ?? 'us') + '.' + urlBase;
}
