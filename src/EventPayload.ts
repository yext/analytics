import { Action } from './Action';
import { VersionLabel } from './VersionLabel';

/**
 * The payload accepted by the Analytics Events API.
 *
 * @public
 */
export interface EventPayload {
  /** The user action which caused the event, e.g. ADD_TO_CART, THUMBS_UP, C_CUSTOM_ACTION  */
  action: Action;
  /** The authorization token for the request. This will be setup from the Key or Bearer in the config. */
  authorization?: string;
  /** Unique identifier to tie together events in a single browsing session */
  sessionId?: string | null;
  /** The URL of the page where the event occurred */
  pageUrl?: string;
  /** The URL of the page the event is directing the visitor to. */
  destinationUrl?: string;
  /** The URL of the page which the visitor came from prior to the event. */
  referrerUrl?: string;
  /** A label assigned to the event, e.g. a CTA label. */
  label?: string;
  /** The locale of the user who generated the event. */
  locale?: string;
  /** The timestamp at which the event occurred, in ISO format. */
  timestamp?: Date | string;
  /** Whether the event is the result of bot activity. */
  bot?: boolean;
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
  /** Indicates whether the event is the result of internal activity. */
  internalUser?: boolean;
  /** Fields specific to reporting Chat Analytics Events */
  chat?: {
    /** The ID of the bot that generated the event. */
    botId: string;
    /** The ID of the conversation in which the event occurred. */
    conversationId?: string;
    /** The ID of the individual response in which the event occurred. */
    responseId?: string;
  };
  /** Fields specific to reporting Yext Search Analytics Events */
  search?: {
    /** Unique identifier of the search */
    searchId?: string;
    /** Unique identifier for a single query across pagination */
    queryId?: string;
    /** The vertical key on which the event occurred, if any */
    verticalKey?: string;
    /** Whether or not the event occurred on a direct answer card */
    isDirectAnswer?: boolean;
    /** The label of the version number of the search config.
     * Either "PRODUCTION" or "STAGING" */
    versionLabel?: VersionLabel;
    /** The version number of the search config */
    versionNumber?: number;
    /** The identifier of the search experience. */
    experienceKey: string;
  };
  /** Fields specific to reporting Yext Sites Analytics Events */
  sites?: {
    /* The UID of the site an event was tied to. */
    siteUid?: number;
    /* The ID of the template from which a site was generated. */
    template?: string;
  };
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
  /** The Yext entity to which the event corresponds. If passed as a string, the value is
   * the mutable, customer-settable entity ID for the entity associated with the event.
   * If passed as a number, it is the immutable entity ID (UID) set by the system. This is an internal ID.
   */
  entity?: string | number;
  /** The IP address for the event.*/
  ip?: {
    /** The IPv4 address associated with the event. */
    address: string;
    /** The algorithm to use to anonymize the IP address after collection. */
    algorithm?: string;
  };
  /**
   * Information used to associate analytics with a particular user.
   *
   * @remarks
   * Keys are visitor methods and values are visitor IDs.
   * Key pattern: `^[a-zA-Z0-9_-]{1,16}$`.
   * Value pattern: `^[\x20-\x7E]{1,64}$`
   *
   * @public
   */
  visitor?: Record<string, string>;
}

/**
 * A Payload that is a subset of the EventPayload
 *
 * @public
 */
export type PartialPayload = Partial<Record<keyof EventPayload, unknown>>;
