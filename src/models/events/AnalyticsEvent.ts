import { ScrollEvent } from './ScrollEvent';
import { AccordionToggleEvent } from './AccordionToggleEvent';
import { CtaEvent } from './CtaEvent';
import { QuestionSubmissionEvent } from './QuestionSubmissionEvent';
import { ThumbsFeedbackEvent } from './ThumbsFeedbackEvent';
import { VoiceSearchEvent } from './VoiceSearchEvent';
import { SearchBarImpressionEvent } from './SearchBarImpressionEvent';
import { SearchClearEvent } from './SearchClearEvent';
import { PaginationEvent } from './PaginationEvent';
import { VerticalViewAllEvent } from './VerticalViewAllEvent';

/**
 * An analytics event
 */
export type AnalyticsEvent =
  AccordionToggleEvent |
  CtaEvent |
  QuestionSubmissionEvent |
  ScrollEvent |
  SearchBarImpressionEvent |
  SearchClearEvent |
  ThumbsFeedbackEvent |
  VerticalViewAllEvent |
  VoiceSearchEvent |
  PaginationEvent;