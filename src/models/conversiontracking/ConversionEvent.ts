/**
 * An event representing a Conversion
 *
 * @public
 */
export interface ConversionEvent {
  /**
   * The id of the conversion tag, you can find the value from the conversion tracking section in your
   * Yext account. You can find a list of tags under:
   * https://www.yext.com/s/[your business id]/reports/conversiontracking/setup
   */
  cid: string

  /**
   * Conversion Value	Optional custom value supplied for this conversion
   */
  cv?: string

  /**
   * A cookie id from a first party cookie (i.e. from a visit to a domain you control)
   */
  firstPartyCookieId?: string

  /**
   * Page went sent the user to the current page
   */
  referrer?: string

  /**
   * A cookie id from a third party, e.g. a Yext listings publisher
   */
  thirdPartyCookieId?: string
}