import {PageType} from './PageType';

/**
 * Represents the analytics parameters required to track events on a directory page
 *
 * @public
 */
export interface DirectoryPage extends PageType{
  /** {@inheritDoc PageType.name} */
  readonly name: 'directory',

  /**
   * The name of the directory page feature, may be from the 'name' property of your feature in features.json
   * or the name of your page template file if you are using yext/pages to implement your page.
   */
  directoryId: string,

  /**
   * Yext Internal ID of Entities to Track. May come from meta.id or the uid parameter of a stream document
   */
  id: number,
}