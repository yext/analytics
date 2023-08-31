/**
 * Response from an analytics request.
 *
 * @public
 */
export interface EventAPIResponse {
  /**
   * Generated ID for the event.
   */
  id: string;
  /**
   * Errors returned for non-successful requests.
   */
  errors?: string[];
}