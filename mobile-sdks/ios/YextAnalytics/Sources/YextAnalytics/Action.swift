import Foundation

/// The action types accepted by the Analytics Events API.
public enum Action: String, CaseIterable {
    case addToCart = "ADD_TO_CART"
    case allTabNavigation = "ALL_TAB_NAVIGATION"
    case apply = "APPLY"
    case autoCompleteSelection = "AUTO_COMPLETE_SELECTION"
    case backwardPaginate = "BACKWARD_PAGINATE"
    case book = "BOOK"
    case brandIcon = "BRAND_ICON"
    case caseStart = "CASE_START"
    case caseSubmitted = "CASE_SUBMITTED"
    case chatImpression = "CHAT_IMPRESSION"
    case chatLinkClick = "CHAT_LINK_CLICK"
    case chatResponse = "CHAT_RESPONSE"
    case citationClick = "CITATION_CLICK"
    case collapse = "COLLAPSE"
    case ctaClick = "CTA_CLICK"
    case drivingDirections = "DRIVING_DIRECTIONS"
    case event = "EVENT"
    case expand = "EXPAND"
    case featuredMessage = "FEATURED_MESSAGE"
    case filteringWithinSection = "FILTERING_WITHIN_SECTION"
    case forwardPaginate = "FORWARD_PAGINATE"
    case headerLinks = "HEADER_LINKS"
    case itemInList = "ITEM_IN_LIST"
    case link = "LINK"
    case mapCard = "MAP_CARD"
    case mapPin = "MAP_PIN"
    case menu = "MENU"
    case message = "MESSAGE"
    case order = "ORDER"
    case pageView = "PAGE_VIEW"
    case paginate = "PAGINATE"
    case post = "POST"
    case presetPrompt = "PRESET_PROMPT"
    case product = "PRODUCT"
    case profile = "PROFILE"
    case questionFocus = "QUESTION_FOCUS"
    case questionSubmit = "QUESTION_SUBMIT"
    case removedFilter = "REMOVED_FILTER"
    case review = "REVIEW"
    case scrollToBottomOfPage = "SCROLL_TO_BOTTOM_OF_PAGE"
    case searchBarImpression = "SEARCH_BAR_IMPRESSION"
    case searchClearButton = "SEARCH_CLEAR_BUTTON"
    case tapToCall = "TAP_TO_CALL"
    case thumbsDown = "THUMBS_DOWN"
    case thumbsUp = "THUMBS_UP"
    case ticketUrl = "TICKET_URL"
    case title = "TITLE"
    case verticalTabNavigation = "VERTICAL_TAB_NAVIGATION"
    case verticalViewAll = "VERTICAL_VIEW_ALL"
    case voiceStart = "VOICE_START"
    case voiceStop = "VOICE_STOP"
    case website = "WEBSITE"
    
    /// Custom action with a C_ prefix
    case custom(String)
    
    public var rawValue: String {
        switch self {
        case .custom(let value):
            return "C_\(value)"
        default:
            return Mirror(reflecting: self).children.first?.value as? String ?? ""
        }
    }
    
    public init?(rawValue: String) {
        if rawValue.hasPrefix("C_") {
            self = .custom(String(rawValue.dropFirst(2)))
        } else if let action = Action.allCases.first(where: { $0.rawValue == rawValue }) {
            self = action
        } else {
            return nil
        }
    }
}