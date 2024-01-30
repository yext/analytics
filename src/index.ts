import { AnalyticsConfig } from './AnalyticsConfig';
import { AnalyticsEventReporter } from './AnalyticsEventReporter';
import { AnalyticsEventService } from './AnalyticsEventService';
import { convertStringToValue } from './convertStringToValue';

/**
 * The Yext Analytics Events SDK.
 * Returns an AnalyticsEventService given an AnalyticsConfig.
 * @public
 */
export function analytics(config: AnalyticsConfig): AnalyticsEventService {
  return new AnalyticsEventReporter(config);
}

/**
 * An alternative entry point for the Yext Analytics Events SDK, currently used by Google Tag Manager.
 * This method reads the config and payload from the variable analyticsEventPayload stored
 * in the global window object. The config and payload are then passed to the report function to be sent
 * to the Yext Analytics Events API.
 * @public
 */
export function reportBrowserAnalytics(): Promise<string> {
  const gtmPayload = window['analyticsEventPayload'];
  let response: Promise<string>;
  if (gtmPayload) {
    const config = gtmPayload[0][1] as Record<string, unknown>;
    const data = gtmPayload[1][1] as Record<string, unknown>;
    if (config) {
      // User text input inside of Google Tag Manager defaults to a String type for all fields.
      // However, the Events API expects true boolean and number types for certain fields.
      // The below convertStringToValue method calls take care of converting the String types
      // to the correct one's for the config and payload objects.
      const correctedConfig = convertStringToValue(config);
      const correctedData = convertStringToValue(data);
      const reporter = new AnalyticsEventReporter(
        correctedConfig as AnalyticsConfig
      );
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
export * from './Action';
export * from './VersionLabel';

declare global {
  interface Window {
    analyticsEventPayload?: GTMPayload;
  }
}
type GTMPayload = Record<string, Record<string, unknown>>;
