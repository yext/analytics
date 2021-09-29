import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for CTA analytics event types. */
export interface CtaData extends AnalyticsEventData {
  /** Whether the event was fired on a direct answer card or not. */
  directAnswer: boolean,
  /**
   * The vertical key for the vertical on which the event was fired. Or, if
   * it is a universal search, the vertical key for the section in the universal
   * results.
   */
  verticalKey: string,
  /** Whether it was on universal or vertical search ('UNIVERSAL' or 'VERTICAL'). */
  searcher: string,
  /** The entity ID for the entity. */
  entityId: string,
  /** The url of the event target. */
  url: string,
  /** (Optional) The name of the Rich Text field used. */
  fieldName?: string
}