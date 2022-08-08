import { CommonConversionData } from './CommonConversionData';

/**
 * An event representing a user arriving at a landing page from a publisher site.
 *
 * @public
 */
export interface ListingsClickEvent extends CommonConversionData{
  /**
   * The source parameter signifying which listings publisher should get credit
   * Comes from the y_source URL Parameter.
   */
  source: string,
}