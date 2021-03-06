## API Report File for "@yext/analytics"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public
export interface AccordionToggleEvent {
    entityId: string;
    queryId: string;
    searcher?: Searcher;
    type: EnumOrString<AnalyticsEventType.RowExpand | AnalyticsEventType.RowCollapse>;
    verticalKey: string;
}

// @public
export interface AllTabNavigationEvent {
    queryId?: string;
    type: EnumOrString<AnalyticsEventType.AllTabNavigation>;
}

// @public
export interface AnalyticsConfig {
    businessId: number;
    domain?: string;
    experienceKey: string;
    experienceVersion: 'PRODUCTION' | 'STAGING' | string;
    visitor?: Visitor;
}

// @public
export type AnalyticsEvent = AccordionToggleEvent | CtaEvent | QuestionSubmissionEvent | ScrollEvent | SearchBarImpressionEvent | SearchClearEvent | SearchDurationEvent | ThumbsFeedbackEvent | VerticalViewAllEvent | VoiceSearchEvent | PaginationEvent | AutocompleteEvent | AllTabNavigationEvent | VerticalTabNavigationEvent;

// @public
export enum AnalyticsEventType {
    // (undocumented)
    AddToCart = "ADD_TO_CART",
    // (undocumented)
    AllTabNavigation = "ALL_TAB_NAVIGATION",
    // (undocumented)
    ApplyNow = "APPLY_NOW",
    // (undocumented)
    AutocompleteSelection = "AUTO_COMPLETE_SELECTION",
    // (undocumented)
    BookAppointment = "BOOK_APPOINTMENT",
    // (undocumented)
    CtaClick = "CTA_CLICK",
    // (undocumented)
    DrivingDirections = "DRIVING_DIRECTIONS",
    // (undocumented)
    Email = "EMAIL",
    // (undocumented)
    FollowUpQuery = "FOLLOW_UP_QUERY",
    // (undocumented)
    OrderNow = "ORDER_NOW",
    // (undocumented)
    Paginate = "PAGINATE",
    // (undocumented)
    QuestionFocus = "QUESTION_FOCUS",
    // (undocumented)
    QuestionSubmit = "QUESTION_SUBMIT",
    // (undocumented)
    ResultsHidden = "RESULTS_HIDDEN",
    // (undocumented)
    ResultsUnhidden = "RESULTS_UNHIDDEN",
    // (undocumented)
    RowCollapse = "ROW_COLLAPSE",
    // (undocumented)
    RowExpand = "ROW_EXPAND",
    // (undocumented)
    Rsvp = "RSVP",
    // (undocumented)
    ScrollToBottomOfPage = "SCROLL_TO_BOTTOM_OF_PAGE",
    // (undocumented)
    SearchBarImpression = "SEARCH_BAR_IMPRESSION",
    // (undocumented)
    SearchClearButton = "SEARCH_CLEAR_BUTTON",
    // (undocumented)
    TapToCall = "TAP_TO_CALL",
    // (undocumented)
    ThumbsDown = "THUMBS_DOWN",
    // (undocumented)
    ThumbsUp = "THUMBS_UP",
    // (undocumented)
    TitleClick = "TITLE_CLICK",
    // (undocumented)
    VerticalTabNavigation = "VERTICAL_TAB_NAVIGATION",
    // (undocumented)
    VerticalViewAll = "VERTICAL_VIEW_ALL",
    // (undocumented)
    ViewWebsite = "VIEW_WEBSITE",
    // (undocumented)
    VoiceStart = "VOICE_START",
    // (undocumented)
    VoiceStop = "VOICE_STOP"
}

// @public
export interface AnalyticsPayload {
    [key: string]: string | number | boolean | AnalyticsPayload;
}

// @public
export interface AnalyticsService {
    report(event: AnalyticsEvent, additionalRequestAttributes?: AnalyticsPayload): Promise<void>;
    setVisitor(visitor: Visitor | undefined): void;
}

// @public
export interface AutocompleteEvent {
    queryId?: string;
    suggestedSearchText: string;
    type: EnumOrString<AnalyticsEventType.AutocompleteSelection>;
}

// @public
export interface CtaEvent {
    ctaLabel?: 'video_played' | string;
    directAnswer?: boolean;
    entityId: string;
    fieldName?: string;
    queryId: string;
    searcher: Searcher;
    type: EnumOrString<AnalyticsEventType.CtaClick | AnalyticsEventType.TitleClick | AnalyticsEventType.TapToCall | AnalyticsEventType.OrderNow | AnalyticsEventType.AddToCart | AnalyticsEventType.ApplyNow | AnalyticsEventType.DrivingDirections | AnalyticsEventType.ViewWebsite | AnalyticsEventType.Email | AnalyticsEventType.BookAppointment | AnalyticsEventType.Rsvp>;
    url?: string;
    verticalKey: string;
}

// @public
export type EnumOrString<T extends string> = T | `${T}`;

// @public
export interface PaginationEvent {
    currentPage: number;
    newPage: number;
    queryId: string;
    totalPageCount: number;
    type: EnumOrString<AnalyticsEventType.Paginate>;
    verticalKey: string;
}

// @public
export function provideAnalytics(config: AnalyticsConfig): AnalyticsService;

// @public
export interface QuestionSubmissionEvent {
    queryId: string;
    searcher: Searcher;
    type: EnumOrString<AnalyticsEventType.QuestionFocus | AnalyticsEventType.QuestionSubmit>;
    verticalKey: string;
}

// @public
export interface ScrollEvent {
    queryId: string;
    type: EnumOrString<AnalyticsEventType.ScrollToBottomOfPage>;
}

// @public
export interface SearchBarImpressionEvent {
    searcher?: Searcher;
    standAlone: boolean;
    type: EnumOrString<AnalyticsEventType.SearchBarImpression>;
    verticalKey?: string;
}

// @public
export interface SearchClearEvent {
    queryId: string;
    type: EnumOrString<AnalyticsEventType.SearchClearButton>;
    verticalKey?: string;
}

// @public
export interface SearchDurationEvent {
    queryId: string;
    searcher: Searcher;
    type: EnumOrString<AnalyticsEventType.ResultsHidden | AnalyticsEventType.ResultsUnhidden | AnalyticsEventType.FollowUpQuery>;
}

// @public
export type Searcher = 'UNIVERSAL' | 'VERTICAL';

// @public
export interface ThumbsFeedbackEvent {
    directAnswer?: boolean;
    entityId?: string;
    queryId: string;
    searcher?: Searcher;
    type: EnumOrString<AnalyticsEventType.ThumbsUp | AnalyticsEventType.ThumbsDown>;
    verticalKey?: string;
}

// @public
export interface VerticalTabNavigationEvent {
    queryId?: string;
    type: EnumOrString<AnalyticsEventType.VerticalTabNavigation>;
    verticalKey: string;
}

// @public
export interface VerticalViewAllEvent {
    queryId: string;
    type: EnumOrString<AnalyticsEventType.VerticalViewAll>;
    verticalKey: string;
}

// @public
export interface Visitor {
    id: string;
    method?: string;
}

// @public
export interface VoiceSearchEvent {
    timestamp: number;
    type: EnumOrString<AnalyticsEventType.VoiceStart | AnalyticsEventType.VoiceStop>;
    voiceSessionId: string;
}

// (No @packageDocumentation comment for this package)

```
