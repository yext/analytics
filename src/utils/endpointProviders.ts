import {Environment, Region} from '../models';

type DomainMap = Record<Region, Record<Environment, string | undefined>>;

const EVENT_DOMAINS: DomainMap = {
  US: {
    PRODUCTION: 'https://www.us.yextevents.com',
    SANDBOX: 'https://www.sbx.us.yextevents.com',
  },
  EU: {
    PRODUCTION: 'https://www.eu.yextevents.com',
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

export function getSearchEndpoint(businessId: number, region?: Region, environment?: Environment): string {
  const domain = getEventDomain(region, environment);
  return `${domain}/realtimeanalytics/data/answers/${businessId}`;
}

export function getSearchEndpointWithDomain(domain: string, businessId: number): string {
  return `${domain}/realtimeanalytics/data/answers/${businessId}`;
}

export function getPagesEndpoint(
  region?: Region,
  environment?: Environment,
  isConversionTrackingEnabled?: boolean
): string {
  const domain = isConversionTrackingEnabled
    ? getConversionTrackingDomain(region, environment)
    : getEventDomain(region, environment);
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
  return getDomain(CONVERSION_TRACKING_DOMAINS, region, env);
}

function getEventDomain(region?: Region, env?: Environment): string {
  return getDomain(EVENT_DOMAINS, region, env);
}

function getDomain(
  domainMap: DomainMap,
  region?: Region,
  env?: Environment)
{
  if (!region) {
    region = 'US';
  }
  if (!env) {
    env = 'PRODUCTION';
  }
  const domain = domainMap[region][env];
  if (!domain) {
    throw Error(`The combination of the environment "${env}" and the region "${region}" is unsupported.`);
  }
  return domain;
}
