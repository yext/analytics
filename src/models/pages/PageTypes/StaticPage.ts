import {PageType} from './PageType';

/**
 * Represents the analytics parameters required to track events on a static page
 *
 * @public
 */
export interface StaticPage extends PageType{
  /** {@inheritDoc PageType.name} */
  readonly name: 'static',
  /**
   * The name of the static page feature, may be from the 'name' property of your feature in features.json
   * or the name of your page template file if you are using yext/pages to implement your page.
   */
  staticPageId: string
}