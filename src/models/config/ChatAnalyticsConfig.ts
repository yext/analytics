/**
 * The main configuration options for Chat Analytics.
 *
 * @public
 */
export default interface ChatAnalyticsConfig {
  /** The API key for accessing the Analytics Events API. */
  apiKey: string; // TODO: Add optional "token" for JWT auth
  /** The environment to send the requests to. */
  env?: 'PROD' | 'SANDBOX';
  /** The physical region of the Yext account */
  region?: 'US' | 'EU';
}