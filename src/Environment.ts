import { EnumOrString } from './EnumOrString';
/**
 * An enum for the Yext Environments
 *
 * @remarks
 * Affects the domain the requests are sent to.
 *
 * @public
 */
export enum EnvironmentEnum {
  Production = 'PRODUCTION',
  Sandbox = 'SANDBOX'
}

/**
 * The Yext Environments
 *
 * @remarks
 * Affects the domain the requests are sent to.
 *
 * @public
 */
export type Environment = EnumOrString<EnvironmentEnum>;