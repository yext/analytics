import { AnalyticsConfig } from './AnalyticsConfig';
import { AnalyticsEventReporter } from './AnalyticsEventReporter';
import { AnalyticsEventService } from './AnalyticsEventService';
import { convertTypesGTM } from './convertTypesGTM';

/**
 * The Yext Analytics Events SDK.
 * Returns an AnalyticsEventService given an AnalyticsConfig.
 * @public
 */
export function analytics(config: AnalyticsConfig): AnalyticsEventService {
  return new AnalyticsEventReporter(config);
}

/**
 * The exported function of Yext Analytics Events SDK used for Google Tag Manager.
 * @public
 */
export function analyticsGTM(): Promise<string> {
  const payload = window['analyticsEventPayload'];
  let response: Promise<string>;
  if (payload) {
    const config = payload[0][1] as Record<string, unknown>;
    const data = payload[1][1] as Record<string, unknown>;
    if (config) {
      const reporter = new AnalyticsEventReporter(config);
      const correctedData = convertTypesGTM(data);
      response = reporter.report(correctedData);
    } else {
      response = Promise.reject('No config found in payload.');
    }
  } else {
    response = Promise.reject('No payload found.');
  }
  return response;
}

export * from './AnalyticsConfig';
export * from './AnalyticsEventService';
export * from './Environment';
export * from './Region';
export * from './EventPayload';
export * from './EnumOrString';
export * from './Action';
export * from './VersionLabel';

declare global {
  interface Window {
    analyticsEventPayload?: Payload;
  }
  type Payload = Record<string, Record<string, unknown>>;
}
