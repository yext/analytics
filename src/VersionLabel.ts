import { EnumOrString } from './EnumOrString';

/**
 * An enum for the Search Version Labels
 *
 * @remarks
 * Affects the contents of the versionLabel field in the search object field in the event payload.
 *
 * @public
 */
export enum VersionLabelEnum {
    Production = 'PRODUCTION',
    Staging = 'STAGING'
}

/**
 * The Search Version Label
 *
 * @remarks
 * Affects the contents of the versionLabel field in the search object field in the event payload.
 *
 * @public
 */
export type VersionLabel = EnumOrString<VersionLabelEnum>;