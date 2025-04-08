import { AnalyticsEventService } from './AnalyticsEventService';
import { AnalyticsConfig } from './AnalyticsConfig';
import { EventPayload } from './EventPayload';
import { getOrSetupSessionId } from './setupSessionId';
import packageinfo from '../package.json';
import { postWithBeacon, postWithFetch, useBeacon } from './post';
import merge from './merge';
import { setupRequestUrl } from './setupRequestUrl';

/** Represents an reporter is responsible for reporting analytics events. */
export class AnalyticsEventReporter implements AnalyticsEventService {
  private config: AnalyticsConfig;
  private payload?: EventPayload;
  /**
   * @param config - necessary analytics config: Must provide one and only
   * one of API Key or Bearer Token.
   *
   * @param payload - (optional) desired event values to report
   */
  constructor(config: AnalyticsConfig, payload?: EventPayload) {
    if (
      config.authorizationType !== 'apiKey' &&
      config.authorizationType !== 'bearer'
    ) {
      throw new Error('Authorization type must be either apiKey or bearer.');
    }
    if (!config.authorization) {
      throw new Error('Authorization must be provided.');
    }
    this.config = config;
    this.payload = payload;
  }

  with(payload: EventPayload): AnalyticsEventService {
    const currentPayload =
      this.payload === undefined ? payload : merge(this.payload, payload);

    return new AnalyticsEventReporter(this.config, currentPayload);
  }

  public async report(newPayload?: EventPayload): Promise<string> {
    const finalPayload: EventPayload = merge(
      this.payload ?? {},
      newPayload ?? {}
    );

    /** If session tracking is disabled, set sessionId to undefined. If it is,
     * enabled, and sessionId was not already manually added to the event payload,
     * call getOrSetupSessionId to set value.
     */
    if (!this.config.sessionTrackingEnabled) {
      finalPayload.sessionId = undefined;
    } else if (!finalPayload.sessionId) {
      finalPayload.sessionId = getOrSetupSessionId();
    }

    finalPayload.clientSdk
      ? ((finalPayload.clientSdk as Record<string, string>)['ANALYTICS'] =
          packageinfo.version)
      : (finalPayload.clientSdk = { ['ANALYTICS']: packageinfo.version });

    finalPayload.authorization =
      this.config.authorizationType === 'apiKey'
        ? 'KEY ' + this.config.authorization
        : 'Bearer ' + this.config.authorization;

    const shouldUseBeacon = useBeacon(finalPayload, this.config.forceFetch);
    const requestUrl = setupRequestUrl(this.config.env, this.config.region);

    // If useBeacon returns true, return boolean response of postWithBeacon as string.
    if (shouldUseBeacon) {
      return new Promise((resolve, reject) => {
        if (postWithBeacon(requestUrl, finalPayload, this.config)) {
          resolve('');
        } else {
          reject('Failed Beacon Call');
        }
      });
    }

    /** If pageUrl is undefined, default to document.URL */
    if (finalPayload.pageUrl === undefined) {
      finalPayload.pageUrl = document.URL;
    }

    /** If referrerUrl is undefined, default to document.referrer */
    if (finalPayload.referrerUrl === undefined) {
      finalPayload.referrerUrl = document.referrer;
    }

    /** If useBeacon returns false, use postWithFetch.
      If result is successful, return result json.
      If request fails, return errors. */
    return postWithFetch(requestUrl, finalPayload, this.config)
      .then((response) => response)
      .catch((e) => e);
  }
}
