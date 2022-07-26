/**
 * A service for reporting either pages or search analytics events.
 */

import { SearchAnalyticsService } from './SearchAnalyticsService';
import { PagesAnalyticsService } from './PagesAnalyticsService';

/**
 * A service for reporting both pages and search analytics events.
 *
 * @public
 */
export interface AnalyticsService extends SearchAnalyticsService,PagesAnalyticsService {
}