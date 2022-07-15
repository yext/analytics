import { AnalyticsEventType } from '../AnalyticsEventType';
import { EnumOrString } from '../utils';


/**
 * A call to action analytics event.
 *
 * @public
 */
export interface PagesEvent {
  /** An enum member or its string value which denotes the event type. */
  type: EnumOrString<
    AnalyticsEventType.PageView |
    AnalyticsEventType.ClickEvent
  >,
  /** The application type. */
  product: 'storepages',
  v: number,
  /** The current page url. */
  pageurl: string,
  /** The url the user came from. */
  pagesReferrer: string,
  /** The business ID for the account. */
  businessids: string,
  /** The site ID for the site. */
  siteId: string,
  /** Whether or not the event was fired from a staging site. */
  isStaging: boolean,
  /** The entity ID for the entity. */
  ids: number,
  /** The name of the stream endpoint. */
  pageSetId: string,
  /** The event ID. */
  eventType?: 'pageview' | string
}