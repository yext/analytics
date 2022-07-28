import {BaseAnalyticsConfig} from './BaseAnalyticsConfig';

/**
 * The main configuration options for Search Analytics.
 *
 * @public
 */
export interface SearchAnalyticsConfig extends BaseAnalyticsConfig {
  /** The experience key of the answers experience. */
  experienceKey: string,
  /** The experience version of the answers experience. */
  experienceVersion: 'PRODUCTION' | 'STAGING' | string,
  /** The domain to send the requests to. */
  domain?: string,
}