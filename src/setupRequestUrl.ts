import { Environment } from './Environment';
import { Region } from './Region';

const urlBase = 'yextevents.com/accounts/me/events';

export function setupRequestUrl(env?: Environment, region?: Region): string {
  const isSandbox = env === 'SANDBOX';
  const lowerRegion = region?.toLowerCase();
  if (isSandbox && lowerRegion === 'eu') {
    throw new Error('Sandbox environment is not available in the EU region.');
  }
  return (
    'https://' +
    (isSandbox ? 'sbx.' : '') +
    (lowerRegion ?? 'us') +
    '.' +
    urlBase
  );
}
