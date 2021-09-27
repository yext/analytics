/**
 * Info about an analytics report response
 */
export interface AnalyticsResponse {
  status: 'success' | 'error'
  message?: string
};