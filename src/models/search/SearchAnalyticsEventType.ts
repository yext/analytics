/**
 * Represents the possible analytics event types.
 *
 * @public
 */
export enum SearchAnalyticsEventType {
  /** {@link AllTabNavigationEvent} */
  AllTabNavigation = 'ALL_TAB_NAVIGATION',
  /** {@link AllTabNavigationEvent} */
  VerticalTabNavigation = 'VERTICAL_TAB_NAVIGATION',
  /** {@link ScrollEvent} */
  ScrollToBottomOfPage = 'SCROLL_TO_BOTTOM_OF_PAGE',
  /** {@link QuestionSubmissionEvent} */
  QuestionFocus = 'QUESTION_FOCUS',
  /** {@link QuestionSubmissionEvent} */
  QuestionSubmit = 'QUESTION_SUBMIT',
  /** {@link AccordionToggleEvent} */
  RowExpand = 'ROW_EXPAND',
  /** {@link AccordionToggleEvent} */
  RowCollapse = 'ROW_COLLAPSE',
  /** {@link ThumbsFeedbackEvent} */
  ThumbsUp = 'THUMBS_UP',
  /** {@link ThumbsFeedbackEvent} */
  ThumbsDown = 'THUMBS_DOWN',
  /** {@link VoiceSearchEvent} */
  VoiceStart = 'VOICE_START',
  /** {@link VoiceSearchEvent} */
  VoiceStop = 'VOICE_STOP',
  /** {@link SearchBarImpressionEvent} */
  SearchBarImpression = 'SEARCH_BAR_IMPRESSION',
  /** {@link SearchClearEvent} */
  SearchClearButton = 'SEARCH_CLEAR_BUTTON',
  /** {@link PaginationEvent} */
  Paginate = 'PAGINATE',
  /** {@link AutocompleteEvent} */
  AutocompleteSelection = 'AUTO_COMPLETE_SELECTION',
  /** {@link VerticalViewAllEvent} */
  VerticalViewAll = 'VERTICAL_VIEW_ALL',

  // CTA event types
  /** {@link CtaEvent} */
  CtaClick = 'CTA_CLICK',
  /** {@link CtaEvent} */
  TitleClick = 'TITLE_CLICK',
  /** {@link CtaEvent} */
  TapToCall = 'TAP_TO_CALL',
  /** {@link CtaEvent} */
  OrderNow = 'ORDER_NOW',
  /** {@link CtaEvent} */
  AddToCart = 'ADD_TO_CART',
  /** {@link CtaEvent} */
  ApplyNow = 'APPLY_NOW',
  /** {@link CtaEvent} */
  DrivingDirections = 'DRIVING_DIRECTIONS',
  /** {@link CtaEvent} */
  ViewWebsite = 'VIEW_WEBSITE',
  /** {@link CtaEvent} */
  Email = 'EMAIL',
  /** {@link CtaEvent} */
  BookAppointment = 'BOOK_APPOINTMENT',
  /** {@link CtaEvent} */
  Rsvp = 'RSVP',

  // Search duration event types
  /** {@link SearchDurationEvent} */
  ResultsHidden = 'RESULTS_HIDDEN',
  /** {@link SearchDurationEvent} */
  ResultsUnhidden = 'RESULTS_UNHIDDEN',
  /** {@link SearchDurationEvent} */
  FollowUpQuery = 'FOLLOW_UP_QUERY',
}

export { SearchAnalyticsEventType as AnalyticsEventType};