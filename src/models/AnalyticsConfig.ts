import { Visitor } from './Visitor';

/**
 * The main configuration options for Analytics.
 *
 * @public
 */
export interface AnalyticsConfig {
  /** The experience key of the answers experience. */
  experienceKey: string,
  /** The experience version of the answers experience. */
  experienceVersion: 'PRODUCTION' | 'STAGING' | string,
  /** The businessId of the answers experience. */
  businessId: number,
  /** The domain to send the requests to. */
  domain?: string,
  /** {@inheritDoc Visitor} */
  visitor?: Visitor
}