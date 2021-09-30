import { AnalyticsEventData } from '../AnalyticsEventData';

/** Data for starting or stopping voice search (VoiceStart and VoiceStop). */
export interface VoiceSearchData extends AnalyticsEventData {
  /** The business ID used for reporting. */
  businessId: string,
  /**
   * The timestamp (number of milliseconds since the Unix epoch) for firing
   * the event.
   */
  timestamp: number,
  /**
   * The UUID for the voice session. Each 'VOICE_STOP' event should
   * correspond to a 'VOICE_START' event with the same ID.
   */
  voiceSessionId: string
}