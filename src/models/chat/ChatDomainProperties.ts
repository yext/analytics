/**
 * Analytics event properties specific to Yext Chat.
 *
 * @public
 */
export interface ChatDomainProperties {
  /** The ID of the bot that generated the event. */
  botId: string;
  /** The ID of the conversation in which the event occurred. */
  conversationId?: string;
  /** The ID of the individual response in which the event occurred. */
  responseId?: string;
}
