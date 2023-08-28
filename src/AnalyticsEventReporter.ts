import { AnalyticsEventService } from './AnalyticsEventService';
import { AnalyticsConfig } from './AnalyticsConfig';
import { EventPayload, PartialPayload } from './EventPayload';
import { EventAPIResponse } from './EventAPIResponse';
import { getOrSetupSessionId } from './setupSessionId';
import { name, version } from '../package.json';
import { post } from './post';
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
      const apiKeyIsSet = config.key !== undefined;
      const bearerTokenIsSet = config.bearer !== undefined;
      const configIsValid = (apiKeyIsSet || bearerTokenIsSet) && !(apiKeyIsSet && bearerTokenIsSet);
      if (!configIsValid) {
        throw new Error('Provide one and only one of API Key or Bearer Token.');
      }
      this.config = config;
      this.payload = payload;
    }

    with(payload: EventPayload): AnalyticsEventService {
      const currentPayload = this.payload === undefined ? payload : merge(this.payload, payload);
      return new AnalyticsEventReporter(this.config, currentPayload);
    }

    public async report(newPayload: PartialPayload): Promise<boolean | EventAPIResponse> {
      const finalPayload = this.payload === undefined ? newPayload : merge(this.payload, newPayload);

      /** If session tracking is enabled, and sessionId was not already manually added to the event payload,
       * call getOrSetupSessionId to set value.
       */
      if (this.config.sessionTrackingEnabled && !finalPayload.sessionId) {
        finalPayload.sessionId = getOrSetupSessionId();
      }

      finalPayload.clientSdk
        ? (finalPayload.clientSdk as Record<string, string>)[name] = version
        : finalPayload.clientSdk = {
          [name]: version,
        };

      finalPayload.authorization = this.config.key
        ? 'KEY ' + this.config.key
        : 'Bearer ' + this.config.bearer;

      const res = await post(
        setupRequestUrl(
          this.config.env,
          this.config.region),
        finalPayload as EventPayload,
        this.config.forceFetch);


      if (typeof res === 'boolean') {
        return res;
      } else if (!res.ok) {
        const body: EventAPIResponse = await res.json();
        let errorMessage = `Events API responded with ${res.status}: ${res.statusText}`;
        body.errors?.forEach(e => errorMessage += `\nError: ${e}.`);
        throw new Error(errorMessage);
      }
      const resJson = await res.json();
      return resJson;
    }
}