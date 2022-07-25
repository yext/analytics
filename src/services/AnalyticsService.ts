/**
 * A service for reporting either pages or search analytics events.
 */

import { SearchAnalyticsService } from './SearchAnalyticsService';
import { PagesAnalyticsService } from './PagesAnalyticsService';

export interface AnalyticsService extends SearchAnalyticsService,PagesAnalyticsService {
}