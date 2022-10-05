import { BaseAnalyticsConfig } from './BaseAnalyticsConfig';
import { DirectoryPage } from '../pages';
import { EntityPage } from '../pages';
import { LocatorPage } from '../pages';
import { StaticPage } from '../pages';

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
   * The full url of the page we are on, typically window.location.href
   */
  pageUrl: string

  /**
   * Page which sent the user to the current page, comes from typically Document.referrer
   */
  referrer: string

  /**
   * The details of the page type
   */
  pageType: DirectoryPage|EntityPage|LocatorPage|StaticPage

  /**
   * The domain of the page. If none is specified, the hostname for the site ID is used.
   *
   * @remarks
   * The domain string must include the scheme (e.g. https://foo.com).
   */
  pageDomain?: string
}