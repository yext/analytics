/**
 * The details of an individual conversion event, without the cookie id.
 *
 * @public
 */
export interface ConversionDetails {
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
}