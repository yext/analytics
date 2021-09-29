import { AnalyticsEventData } from "../AnalyticsEventData";

/** Data for CtaClick event when video is played. */
export interface VideoPlayData extends AnalyticsEventData {
  /** {@inheritdoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritdoc CtaData.entityId} */
  entityId: string,
  /** {@inheritdoc CtaData.searcher} */
  searcher: string,
  /** The label for this CTA event. */
  ctaLabel: 'video_played'
}