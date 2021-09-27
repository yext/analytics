import { AnalyticsEventData } from "./AnalyticsEventData";

/**
 * The main configuration options for {@link AnswersCore}.
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
  /** The domain to send the requests to */
  domain?: string,
  /** Options added to every analytics event */
  baseOptions?: AnalyticsEventData
}