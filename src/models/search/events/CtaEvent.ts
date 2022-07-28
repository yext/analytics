import { SearchAnalyticsEventType } from '../SearchAnalyticsEventType';
import { Searcher } from '../Searcher';
import { EnumOrString } from '../utils';


/**
 * A call to action analytics event.
 *
 * @public
 */
export interface CtaEvent {
  /** An enum member or its string value which denotes the event type. */
  type: EnumOrString<
    SearchAnalyticsEventType.CtaClick |
    SearchAnalyticsEventType.TitleClick |
    SearchAnalyticsEventType.TapToCall |
    SearchAnalyticsEventType.OrderNow |
    SearchAnalyticsEventType.AddToCart |
    SearchAnalyticsEventType.ApplyNow |
    SearchAnalyticsEventType.DrivingDirections |
    SearchAnalyticsEventType.ViewWebsite |
    SearchAnalyticsEventType.Email |
    SearchAnalyticsEventType.BookAppointment |
    SearchAnalyticsEventType.Rsvp
  >,
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
  /** The ID of the most recent query. */
  queryId: string,
  /** Whether or not the event was fired on a direct answer card. */
  directAnswer?: boolean,
  /** The url of the event target. */
  url?: string,
  /** The name of the Rich Text field used. */
  fieldName?: string,
  /** The label for this CTA event. */
  ctaLabel?: 'video_played' | string
}