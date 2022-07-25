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
  /** denotes this config is a search config */
  readonly isSearch: true,
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
  /** denotes that this is a pages config */
  readonly isPages: true,
  /**
   * The ID of the Pages Site
   * Can be easily found from the url of the Deploy Page in your Yext Account
   * e.g. https://www.yext.com/s/[businessId]/yextsites/[siteid]/branch/[branchId]/deploys/recent
   */
  siteId: number,

  /**
   * The analytics ID of the version of pages
   * 'storepages' for classic pages
   * 'sites' for the latest version of the platform
   */
  product: 'storepages' |'sites';

  /**
   * Page Type
   * The 'Page Type' filter found in analytics report builder
   * Either entity, directory, locator, or static
   */
  pageType: 'entity'|'directory'|'locator'|'static',

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
   * The path component of the page url
   * will default to window.location.pathname
   */
  path?: string

  /**
   * The identifier of the feature within the site,
   * typically 'name' key of the feature in the features.json file
   */
  featureId: string,

  /**
   * The url the user came from
   * will default to window.document.referrer
   * */
  pagesReferrer?: string,
}

/**
 * Combined Analytics Config for tracking Search & Pages on the same site
 *
 * @public
 */
export interface AnalyticsConfig extends SearchAnalyticsConfig, PagesAnalyticsConfig {
}
