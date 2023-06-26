/**
 * The action types accepted by the Analytics Events API.
 *
 * @public
 */
export type Action =
 | 'ADD_TO_CART'
 | 'ALL_TAB_NAVIGATION'
 | 'APPLY'
 | 'AUTO_COMPLETE_SELECTION'
 | 'BACKWARD_PAGINATE'
 | 'BOOK'
 | 'BRAND_ICON'
 | 'CALL_TO_ACTION'
 | 'CASE_START'
 | 'CASE_SUBMITTED'
 | 'CHAT_IMPRESSION'
 | 'CHAT_LINK_CLICK'
 | 'CHAT_RESPONSE'
 | 'COLLAPSE'
 | 'DIRECTIONS'
 | 'EVENT'
 | 'EXPAND'
 | 'FEATURED_MESSAGE'
 | 'FILTERING_WITHIN_SECTION'
 | 'FORWARD_PAGINATE'
 | 'HEADER_LINKS'
 | 'ITEM_IN_LIST'
 | 'MAP_CARD'
 | 'MAP_PIN'
 | 'MENU'
 | 'MESSAGE'
 | 'ORDER'
 | 'PAGINATE'
 | 'PHONE'
 | 'POST'
 | 'PRESET_PROMPT'
 | 'PRODUCT'
 | 'PROFILE'
 | 'QUESTION_FOCUS'
 | 'QUESTION_SUBMIT'
 | 'REMOVED_FILTER'
 | 'REVIEW'
 | 'SCROLL_TO_BOTTOM_OF_PAGE'
 | 'SEARCH_BAR_IMPRESSION'
 | 'SEARCH_CLEAR_BUTTON'
 | 'THUMBS_DOWN'
 | 'THUMBS_UP'
 | 'TICKET_URL'
 | 'TITLE'
 | 'VERTICAL_TAB_NAVIGATION'
 | 'VERTICAL_VIEW_ALL'
 | 'VOICE_START'
 | 'VOICE_STOP'
 | 'WEBSITE';


/**
 * The payload accepted by the Analytics Events API.
 *
 * @public
 */
export interface EventPayload {
  /** The user action which caused the event, e.g. ADD_TO_CART or THUMBS_UP  */
  action: Action;
  /** Unique identifier to tie together events in a single browsing session */
  sessionId?: string;
  /** The URL of the page where the event occurred */
  pageUrl?: string;
  /** The URL of the page the event is directing the visitor to. */
  destinationUrl?: string;
  /** A label assigned to the event, e.g. a CTA label. */
  label?: string;
  /** The locale of the user who generated the event. */
  locale?: string;
  /** The timestamp at which the event occurred, in ISO format. */
  timestamp?: Date | string;
  /** Whether the event is the result of bot activity. */
  bot?: string;
  /** Information about the visitors device and browser. */
  browserAgent?: {
    /** The browser associated with the event. */
    browser?: string;
    /** The browser version associated with the event. */
    browserVersion?: string;
    /** The operating system associated with the event. */
    os?: string;
    /** The operating system version associated with the event. */
    osVersion?: string;
    /** The device associated with the event. */
    device?: string;
    /** The device class associated with the event. */
    deviceClass?: string;
    /** The user agent associated with the event. */
    userAgent?: string;
  };
  /**
   * For the Yext client SDKs involved in the event, this is an object mapping
   * the names of those SDKs to the version labels of those SDKs.
   */
  clientSdk?: Record<string, string>;
  /**
   * When the record summarizes multiple events, the number of events the record represents.
   * The event is treated as if it is duplicated this many times.
   */
  count?: number;
  /**
   * Up to 10 pairs matching custom string keys to string values to associate with the event.
   * Keys are case-insensitive; values are case-sensitive.
   */
  customTags?: Record<string, string>;
  /**
   * Up to 10 pairs matching custom string keys to number values to associate with the event.
   * Keys are case-insensitive.
   */
  customValues?: Record<string, number>;
  /** The Yext Chat properties of the event */
  chat?: ChatDomainProperties;
  /** The Yext entity to which the event corresponds.  */
  entity?:
    | {
      /** The mutable, customer-settable entity ID for the entity associated with the event. */
        entityId: string;
      }
    | {
      /** The immutable entity ID set by the system. This is an internal ID. */
        entityUid: number;
      };
  /** The IP address for the event.*/
  ip?: {
    /** The IPv4 address associated with the event. */
    address: string;
    /** The algorithm to use to anonymize the IP address after collection. */
    algorithm?: string;
  };
}

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
