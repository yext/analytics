import { Environment, EnvironmentEnum } from './Environment';
import { Region } from './Region';

const urlBase = 'yextevents.com/accounts/me/events';

export function setupRequestUrl(env?: Environment, region?: Region): string {
  return 'https://' + (env === EnvironmentEnum.Sandbox ? 'sbx.' : '') + (region ?? 'us') + '.' + urlBase;
}
