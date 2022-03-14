/**
 * The response to the analytics report function.
 *
 * @public
 */
export interface AnalyticsResponse {
  /**
   * Indicates whether or not the analytics report was sucessfully queued.
   *
   * @remarks
   * The status will be accurate for all devices which support
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon | Navigator.sendBeacon()}.
   * If the analytics report is fired on Node.js, or IE11, the status will always return 'success'.
   */
  status: 'success' | 'error'
  /** The message associated with the response. */
  message?: string
}