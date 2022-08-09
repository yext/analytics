/**
 * Shared properties of both ConversionEvent and ListingsClickEvent
 *
 * @public
 */
export interface CommonConversionData {
  /**
   * A cookie id from a first party cookie (i.e. from a visit to a domain you control)
   */
  cookieId: string

  /**
   * Page which sent the user to the current page, comes from typically Document.referrer
   */
  referrer?: string

  /**
   * The url of the landing page.
   */
  location: string,
}