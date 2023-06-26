import { EventPayload } from '../EventPayload';
import { ChatDomainProperties } from './ChatDomainProperties';

/**
 * The payload accepted by the Analytics Events API for Chat related analytics.
 *
 * @public
 */
export interface ChatEventPayLoad extends EventPayload {
  /** {@inheritdoc ChatDomainProperties} */
  chat: ChatDomainProperties
}