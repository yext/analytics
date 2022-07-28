import {PageType} from './PageType';
/**
 * Represents the analytics parameters required to track events on an Entity Page
 *
 * @public
 */
export interface EntityPage extends PageType{
  /** {@inheritDoc PageType.name} */
  readonly name: 'entity',

  /**
   * The name of the entity page feature, may be from the 'name' property of your feature in features.json
   * or the name of your page template file if you are using yext/pages to implement your page.
   */
  pageSetId: string,

  /**
   * Yext Internal ID of Entities to Track. May come from meta.id or the uid parameter of a stream document
   */
  id: number,
}