/**
 * An event representing a user arriving at a landing page from a publisher site.
 *
 * @public
 */
export interface ListingsClickEvent {
  /**
   * The source parameter signifying which listings publisher should get credit
   * Comes from the y_source URL Parameter.
   */
  source: string,

  /**
   * The url of the landing page.
   */
  location: string,

  /**
   * Page went sent the user to the current page
   */
  referrer?: string,

  /**
   * A cookie id from a first party cookie (i.e. from a visit to a domain you control)
   */
  firstPartyCookieId?: string,

  /**
   * A cookie id from a third party, e.g. a Yext listings publisher
   */
  thirdPartyCookieId?: string,
}