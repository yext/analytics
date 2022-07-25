import { Visitor } from './Visitor';

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
}

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
  /** {@inheritDoc Visitor} */
  visitor?: Visitor
}

/**
 * The main configuration options for Pages Analytics
 *
 * @public
 */
export interface PagesAnalyticsConfig extends BaseAnalyticsConfig{
  /**
   * The ID of the Pages Site
   * Can be easily found from the url of the Deploy Page in your Yext Account
   * e.g. https://www.yext.com/s/[businessId]/yextsites/[siteid]/branch/[branchId]/deploys/recent
   */
  siteId: number,

  /**
   * Set to true if the environment is production
   * If set to true events will appear in Analytics Reports in your Yext Account
   */
  production: boolean,

  /**
   * Yext Internal ID of Entities to Track
   */
  ids?: number[],

  /**
   * The identifier of the feature within the site,
   * typically 'name' key of the feature in the features.json file
   */
  pageSetId: string,

  /** TODO: do we want to include directory | locator | static?
    * staticPageId: string // static page id
    * searchId: string // search page id
    * directoryId: string // directory feature id
    * directoryPath: string // relative path on the directory page
  */

  /** The current page url. */
  pageurl?: string,

  /** The url the user came from. */
  pagesReferrer?: string,
}

/**
 * Combined Analytics Config for tracking Search & Pages on the same site
 *
 * @public
 */
export interface AnalyticsConfig extends SearchAnalyticsConfig, PagesAnalyticsConfig {
}