/**
 * The shape of the data which is sent during a beacon request.
 *
 * @public
 */
export interface BeaconPayload {
  /** Strings mapped to data or objects. */
  [key: string]: string | number | boolean | BeaconPayload
}