/**
 * Info about an analytics report response
 *
 * @public
 */
export interface AnalyticsResponse {
  status: 'success' | 'error'
  message?: string
}