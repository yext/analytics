import {Environment} from './Environment';
import {Region} from './Region';

/**
 * The main configuration options for Chat Analytics.
 *
 * @public
 */
export interface ChatAnalyticsConfig {
  /** The API key for accessing the Analytics Events API. */
  apiKey: string; // TODO: Add optional "token" for JWT auth
  /** {@inheritDoc SearchAnalyticsConfig.env} */
  env?: Environment;
  /** {@inheritDoc SearchAnalyticsConfig.region} */
  region?: Region;
  /** Override for the URL which are used when making requests to the Analytics API. */
  endpoint?: string;
  /**
   * Whether to enable session tracking for analytics events.
   * Defaults to true for US region.
   * Defaults to false for EU region.
   *
   * @remarks
   * This generates a ULID to tie together events in a single browsing session.
   */
  sessionTrackingEnabled?: boolean;
}