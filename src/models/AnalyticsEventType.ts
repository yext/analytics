/**
 * Represents the possible analytics event types
 */
export enum AnalyticsEventType {
  ScrollToBottomOfPage = 'SCROLL_TO_BOTTOM_OF_PAGE',
  QuestionFocus = 'QUESTION_FOCUS',
  QuestionSubmit = 'QUESTION_SUBMIT',
  RowExpand = 'ROW_EXPAND',
  RowCollapse = 'ROW_COLLAPSE',
  ThumbsUp = 'THUMBS_UP',
  ThumbsDown = 'THUMBS_DOWN',
  VoiceStart = 'VOICE_START',
  VoiceStop = 'VOICE_STOP',
  SearchBarImpression = 'SEARCH_BAR_IMPRESSION',
  SearchClearButton = 'SEARCH_CLEAR_BUTTON',

  // CTA event types
  CtaClick = 'CTA_CLICK',
  TitleClick = 'TITLE_CLICK',
  TapToCall = 'TAP_TO_CALL',
  OrderNow = 'ORDER_NOW',
  AddToCart = 'ADD_TO_CART',
  ApplyNow = 'APPLY_NOW',
  DrivingDirections = 'DRIVING_DIRECTIONS',
  ViewWebsite = 'VIEW_WEBSITE',
  Email = 'EMAIL',
  BookAppointment = 'BOOK_APPOINTMENT',
  Rsvp = 'RSVP'
}