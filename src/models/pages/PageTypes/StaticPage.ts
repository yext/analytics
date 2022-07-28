/**
 * Represents the analytics parameters required to track events on a static page
 *
 * @public
 */
export interface StaticPage {
  /**
   * The name of the static page feature, may be from the 'name' property of your feature in features.json
   * or the name of your page template file if you are using yext/pages to implement your page.
   */
  staticPageId: string
}