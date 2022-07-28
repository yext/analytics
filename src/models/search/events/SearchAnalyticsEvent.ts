import { ScrollEvent } from './ScrollEvent';
export { ScrollEvent };
import { AccordionToggleEvent } from './AccordionToggleEvent';
export { AccordionToggleEvent };
import { CtaEvent } from './CtaEvent';
export { CtaEvent };
import { QuestionSubmissionEvent } from './QuestionSubmissionEvent';
export { QuestionSubmissionEvent };
import { ThumbsFeedbackEvent } from './ThumbsFeedbackEvent';
export { ThumbsFeedbackEvent };
import { VoiceSearchEvent } from './VoiceSearchEvent';
export { VoiceSearchEvent };
import { SearchBarImpressionEvent } from './SearchBarImpressionEvent';
export { SearchBarImpressionEvent };
import { SearchClearEvent } from './SearchClearEvent';
export { SearchClearEvent };
import { PaginationEvent } from './PaginationEvent';
export { PaginationEvent };
import { AutocompleteEvent } from './AutocompleteEvent';
export { AutocompleteEvent };
import { VerticalViewAllEvent } from './VerticalViewAllEvent';
export { VerticalViewAllEvent };
import { SearchDurationEvent } from './SearchDurationEvent';
export { SearchDurationEvent };
import { AllTabNavigationEvent } from './AllTabNavigationEvent';
export { AllTabNavigationEvent };
import { VerticalTabNavigationEvent } from './VerticalTabNavigationEvent';
export { VerticalTabNavigationEvent };

/**
 * An analytics event.
 *
 * @public
 */
export type SearchAnalyticsEvent =
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