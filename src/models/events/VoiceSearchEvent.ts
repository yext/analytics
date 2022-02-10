import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrLiteral } from '../utils';

/** Event for starting or stopping voice search. */
export interface VoiceSearchEvent {
  type: EnumOrLiteral<AnalyticsEventType.VoiceStart | AnalyticsEventType.VoiceStop>,
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