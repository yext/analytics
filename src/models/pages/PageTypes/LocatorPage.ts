import {PageType} from './PageType';

/**
 * Represents the analytics parameters required to track events on a Locator Page
 *
 * @public
 */
export interface LocatorPage extends PageType{
  /** {@inheritDoc PageType.name} */
  readonly name: 'locator',
  /**
   * The name of the locator page feature, may be from the 'name' property of your feature in features.json
   * or the name of your page template file if you are using yext/pages to implement your page.
   */
  searchId: string,
}