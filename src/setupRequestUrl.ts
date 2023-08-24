import { Environment, EnvironmentEnum } from './Environment';
import { Region } from './Region';

export function setupRequestUrl(env?: Environment, region?: Region): string {
  const urlBase = 'yextevents.com/accounts/me/events';
  return 'https://' + (env === EnvironmentEnum.Sandbox ? 'sbx.' : '') + (region ?? 'us') + '.' + urlBase;
}