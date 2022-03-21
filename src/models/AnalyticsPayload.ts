/**
 * The shape of the data which is sent during an analytics request.
 *
 * @public
 */
export interface AnalyticsPayload {
  /** Strings mapped to data or objects. */
  [key: string]: string | number | boolean | AnalyticsPayload
}