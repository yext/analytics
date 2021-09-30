import { AnalyticsEventData } from "../AnalyticsEventData";
import { Searcher } from "../Searcher";

/** Data for CtaClick event when video is played. */
export interface VideoPlayData extends AnalyticsEventData {
  /** {@inheritDoc CtaData.verticalKey} */
  verticalKey: string,
  /** {@inheritDoc CtaData.entityId} */
  entityId: string,
  /** {@inheritDoc CtaData.searcher} */
  searcher: Searcher,
  /** The label for this CTA event. */
  ctaLabel: 'video_played'
}