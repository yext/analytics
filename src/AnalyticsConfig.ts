import { Environment } from './Environment';
import { Region } from './Region';

/**
 * The main configuration options for Analytics Events.
 *
 * @public
 */
export interface AnalyticsConfig {
  /** Used for specifying if an API Key or Bearer Token is used for the authorization property. */
  authorizationType: 'apiKey' | 'bearer';
  /** The API Key, OAuth, or bearer token for accessing the Analytics Events API. */
  authorization: string;
  /** The Yext environment to send requests to. Defaults to 'PRODUCTION'. */
  env?: Environment;
  /** The region to send requests to. Defaults to 'US'. */
  region?: Region;
  /**
   * Whether to enable session tracking for analytics events.
   * Defaults to true for both environments. If set to false, sessionId will automatically
   * be set to undefined in the event payload.
   * @remarks
   * This generates a ULID to tie together events in a single browsing session.
   */
  sessionTrackingEnabled?: boolean;
  /**
   * Used to force sending the request with fetch even if the browser
   * does not support fetch with the keepalive flag (like Firefox).
   * If the browser does support it, fetch is used by default. */
  forceFetch?: boolean;

  /**
   * Used to enable debug mode, which is false by default.
   * When enabled the SDK will not send requests to the Events API, but will log the request
   * with other useful debug information instead.
   */
  debug?: boolean;
}
