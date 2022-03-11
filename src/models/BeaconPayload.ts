/**
 * The shape of the data which is send during a beacon request.
 *
 * @public
 */
export interface BeaconPayload {
  /** Strings mapped to data or objects. */
  [key: string]: string | number | boolean | BeaconPayload
}