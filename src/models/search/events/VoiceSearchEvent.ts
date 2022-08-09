import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { EnumOrString } from '../utils';

/**
 * Event for starting or stopping voice search.
 *
 * @public
 */
export interface VoiceSearchEvent {
  /** {@inheritDoc CtaEvent."type"} */
  type: EnumOrString<SearchAnalyticsEventType.VoiceStart | SearchAnalyticsEventType.VoiceStop>,
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