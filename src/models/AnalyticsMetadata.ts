/**
 * Info about an analytics report
 */
export interface AnalyticsMetadata {
  status: 'success' | 'error'
  message?: string
};