import {BaseAnalyticsConfig} from './BaseAnalyticsConfig';
import {Region, Environment} from '../config';

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
  /**
   * Determines the domain to send the requests to. Defaults to 'US',
   * and is overridden by the domain property if it is set.
   */
  region?: Region;
  /** The Yext environment to send the requests to. Defaults to 'PRODUCTION' */
  env?: Environment,
  /**
   * The domain to send the requests to.
   *
   * @deprecated
   * Use a combination of {@link SearchAnalyticsConfig.region} and {@link SearchAnalyticsConfig.env} instead.
   */
  domain?: string,
}