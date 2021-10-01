import { AnalyticsEventType } from '../AnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrLiteral } from '../utils';


/** A call to action analytics event. */
export interface CtaEvent {
  type: EnumOrLiteral<
    AnalyticsEventType.CtaClick |
    AnalyticsEventType.TitleClick |
    AnalyticsEventType.TapToCall |
    AnalyticsEventType.OrderNow |
    AnalyticsEventType.AddToCart |
    AnalyticsEventType.ApplyNow |
    AnalyticsEventType.DrivingDirections |
    AnalyticsEventType.ViewWebsite |
    AnalyticsEventType.Email |
    AnalyticsEventType.BookAppointment |
    AnalyticsEventType.Rsvp
  >
  /**
   * The vertical key for the vertical on which the event was fired. Or, if
   * it is a universal search, the vertical key for the section in the universal
   * results.
   */
  verticalKey: string,
  /** The entity ID for the entity. */
  entityId: string,
  /** Whether it was on universal or vertical search. */
  searcher: Searcher,
  /** The ID of the most recent query */
  queryId: string
  /** Whether or not the event was fired on a direct answer card. */
  directAnswer?: boolean,
  /** The url of the event target. */
  url?: string,
  /** The name of the Rich Text field used. */
  fieldName?: string,
  /** The label for this CTA event. */
  ctaLabel?: 'video_played' | string,
}