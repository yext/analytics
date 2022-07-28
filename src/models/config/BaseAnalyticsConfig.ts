import {Visitor} from '../search';

/**
 * Base analytics configuration
 *
 * @public
 */
export interface BaseAnalyticsConfig {
  /**
   * Your Yext Account ID
   * Can be easily found from the url of your homepage of your Yext account
   * e.g. https://www.yext.com/s/[businessId]/home
   */
  businessId: number,

  /** {@inheritDoc Visitor} */
  visitor?: Visitor

  /**
   * Turn on analytics event logging in the console
   */
  debug?: boolean;
}