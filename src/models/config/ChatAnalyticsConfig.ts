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
  /**
   * Whether to enable session tracking for analytics events.
   * Defaults to false.
   *
   * @remarks
   * This generates a ULID to tie together events in a single browsing session.
   */
  sessionTrackingEnabled?: boolean;
}