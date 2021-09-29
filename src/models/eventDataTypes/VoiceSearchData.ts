import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for starting or stopping voice search (VoiceStart and VoiceStop). */
export interface VoiceSearchData extends AnalyticsEventData {
  /** The business ID used for reporting. */
  businessId: string,
  /** The timestamp for firing the event. */
  timestamp: number,
  /** The unique ID for the voice session. */
  voiceSessionId: string,
  /** Should not include the query ID in the event. */
  includeQueryId: false
}