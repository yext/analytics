import {Environment, Region} from '../models';

type DomainMap = Record<Region, Record<Environment, string | undefined>>;

const EVENT_DOMAINS: DomainMap = {
  US: {
    PRODUCTION: 'https://us.yextevents.com',
    SANDBOX: 'https://sbx.us.yextevents.com',
  },
  EU: {
    PRODUCTION: 'https://eu.yextevents.com',
    SANDBOX: undefined
  }
};

const CONVERSION_TRACKING_DOMAINS: DomainMap = {
  US: {
    PRODUCTION: 'https://realtimeanalytics.yext.com',
    SANDBOX: 'https://sandbox-realtimeanalytics.yext.com',
  },
  EU: {
    PRODUCTION: undefined,
    SANDBOX: undefined
  }
};

export function getChatEndpoint(region?: Region, environment?: Environment): string {
  const domain = getEventDomain(region, environment);
  return `${domain}/accounts/me/events`;
}

export function getSearchEndpoint(
  businessId: number,
  region?: Region,
  environment?: Environment,
  customDomain?: string
): string {
  const domain = customDomain ? customDomain : getEventDomain(region, environment);
  return `${domain}/realtimeanalytics/data/answers/${businessId}`;
}

export function getPagesEndpoint(
  region?: Region,
  isConversionTrackingEnabled?: boolean
): string {
  const domain = isConversionTrackingEnabled
    ? getConversionTrackingDomain(region)
    : getEventDomain(region);
  return `${domain}/store_pagespixel`;
}

export function getConversionTrackingEndpoint(): string {
  const domain = getConversionTrackingDomain('US', 'PRODUCTION');
  return `${domain}/conversiontracking/conversion`;
}

export function getConversionTrackingListingsEndpoint(): string {
  const domain = getConversionTrackingDomain('US', 'PRODUCTION');
  return `${domain}/listings`;
}

function getConversionTrackingDomain(region?: Region, env?: Environment): string {
  return getDomain(CONVERSION_TRACKING_DOMAINS, region, env, true);
}

function getEventDomain(region?: Region, env?: Environment): string {
  return getDomain(EVENT_DOMAINS, region, env);
}

function getDomain(
  domainMap: DomainMap,
  region: Region = 'US',
  env: Environment = 'PRODUCTION',
  conversionTrackingEnabled = false)
{
  const domain = domainMap[region][env];
  if (!domain) {
    throw Error(`The combination of the environment: "${env}", region: "${region}",`
      + `and conversionTrackingEnabled: "${conversionTrackingEnabled}" is unsupported.`);
  }
  return domain;
}
