import { ScrollEvent } from './ScrollEvent';
import { AccordionToggleEvent } from './AccordionToggleEvent';
import { CtaEvent } from './CtaEvent';
import { QuestionSubmissionEvent } from './QuestionSubmissionEvent';
import { ThumbsFeedbackEvent } from './ThumbsFeedbackEvent';
import { VoiceSearchEvent } from './VoiceSearchEvent';
import { SearchBarImpressionEvent } from './SearchBarImpressionEvent';
import { SearchClearEvent } from './SearchClearEvent';
import { PaginationEvent } from './PaginationEvent';
import { AutocompleteEvent } from './AutocompleteEvent';
import { VerticalViewAllEvent } from './VerticalViewAllEvent';
import { SearchDurationEvent } from './SearchDurationEvent';
import { AllTabNavigationEvent } from './AllTabNavigationEvent';
import { VerticalTabNavigationEvent } from './VerticalTabNavigationEvent';

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
  SearchDurationEvent |
  ThumbsFeedbackEvent |
  VerticalViewAllEvent |
  VoiceSearchEvent |
  PaginationEvent |
  AutocompleteEvent |
  AllTabNavigationEvent |
  VerticalTabNavigationEvent;