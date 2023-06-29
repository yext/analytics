import {EnumOrString} from '../../utils';

/**
 * An enum of the physical region the Yext account
 *
 * @remarks
 * Affects the domain the requests are sent to.
 *
 * @public
 */
export enum RegionEnum {
  US = 'US',
  EU = 'EU'
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
