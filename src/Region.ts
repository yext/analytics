import { EnumOrString } from './EnumOrString';
/**
 * An enum of the physical region the Yext account
 *
 * @remarks
 * Affects the domain the requests are sent to.
 *
 * @public
 */
export enum RegionEnum {
  US = 'us',
  EU = 'eu'
}

/**
 * The physical region of the Yext account
 *
 * @remarks
 * Affects the domain the requests are sent to.
 *
 * @public
 */
export type Region = EnumOrString<RegionEnum>;
