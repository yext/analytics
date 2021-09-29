/**
 * Represents the possible analytics event types
 */
export enum AnalyticsEventTypeEnum {
  ScrollToBottomOfPage = 'SCROLL_TO_BOTTOM_OF_PAGE',
  QuestionFocus = 'QUESTION_FOCUS',
  QuestionSubmit = 'QUESTION_SUBMIT',
  RowExpand = 'ROW_EXPAND',
  RowCollapse = 'ROW_COLLAPSE',
  ThumbsUp = 'THUMBS_UP',
  ThumbsDown = 'THUMBS_DOWN',
  VoiceStart = 'VOICE_SEARCH',
  VoiceStop = 'VOICE_STOP',

  // CTA event types
  TitleClick = 'TITLE_CLICK',
  CtaClick = 'CTA_CLICK',
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

// Use a template literal type to create a union of string literal types based on the enum values
export type AnalyticsEventType = AnalyticsEventTypeEnum | `${AnalyticsEventTypeEnum}`;