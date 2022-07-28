import {BaseAnalyticsConfig} from './BaseAnalyticsConfig';
import {DirectoryPage} from '../pages';
import {EntityPage} from '../pages';
import {LocatorPage} from '../pages';
import {StaticPage} from '../pages';

/**
 * The main configuration options for Pages Analytics.  Contains all page or session level information.
 *
 * @public
 */
export interface PagesAnalyticsConfig extends BaseAnalyticsConfig {
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
   * The path component of the page url
   */
  path: string

  /**
   * The url the user came from
   * */
  pagesReferrer: string,

  /**
   * The details of the page type
   */
  pageType: DirectoryPage|EntityPage|LocatorPage|StaticPage
}