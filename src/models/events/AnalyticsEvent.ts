import { ScrollEvent } from './ScrollEvent';
import { AccordionToggleEvent } from './AccordionToggleEvent';
import { CtaEvent } from './CtaEvent';
import { QuestionSubmissionEvent } from './QuestionSubmissionEvent';
import { ThumbsFeedbackEvent } from './ThumbsFeedbackEvent';
import { VoiceSearchEvent } from './VoiceSearchEvent';

/**
 * An analytics event
 */
export type AnalyticsEvent =
  ScrollEvent |
  AccordionToggleEvent |
  CtaEvent |
  QuestionSubmissionEvent |
  ThumbsFeedbackEvent |
  VoiceSearchEvent;