/**
 * Represents the possible analytics event types
 */
export enum AnalyticsEventTypeEnum {
  ScrollToBottomOfPage = 'SCROLL_TO_BOTTOM_OF_PAGE',
  QuestionFocus = 'QUESTION_FOCUS',
  QuestionSubmit = 'QUESTION_SUBMIT',
  RowExpand = 'ROW_EXPAND',
  RowCollapse = 'ROW_COLLAPSE',
  CtaClick = 'CTA_CLICK',
  ThumbsUp = 'THUMBS_UP',
  ThumbsDown = 'THUMBS_DOWN',
  TapToCall = 'TAP_TO_CALL'
}

// Use a template literal type to create a union of string literal types based on the enum values
export type AnalyticsEventType = AnalyticsEventTypeEnum | `${AnalyticsEventTypeEnum}`;