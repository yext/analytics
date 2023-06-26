import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { ConversionTrackingReporter } from './infra/ConversionTrackingReporter';
import { SearchAnalyticsReporter } from './infra/SearchAnalyticsReporter';
import { PagesAnalyticsReporter } from './infra/PagesAnalyticsReporter';
import { ChatAnalyticsReporter } from './infra/ChatAnalyticsReporter';
import { AnalyticsConfig, PagesAnalyticsConfig, SearchAnalyticsConfig, ChatAnalyticsConfig } from './models';
import { AnalyticsService, SearchAnalyticsService, PagesAnalyticsService, ConversionTrackingService } from './services';
import { ChatAnalyticsService } from './services/ChatAnalyticsService';

/**
 * Maintained for backwards compatibility with older versions of the library
 * provideAnalytics uses the AnalyticsConfig, AnalyticsService, and AnalyticsReporter aliases
 * for SearchAnalyticsConfig, SearchAnalyticsService, and SearchAnalyticsReporter
 *
 * @remarks
 * Returns an analytics service instance.
 *
 * @param config - The analytics config
 *
 * @public
 */
export function provideAnalytics(config: AnalyticsConfig): AnalyticsService {
  const httpRequester = new HttpRequester();
  return new AnalyticsReporter(config, httpRequester);
}

/**
 * Provides a Search Analytics service given a Search specific config
 *
 * @remarks
 * Returns an analytics service instance.
 *
 * @param config - The Search analytics config
 *
 * @public
 */
export function provideSearchAnalytics(config: SearchAnalyticsConfig): SearchAnalyticsService {
  const httpRequester = new HttpRequester();
  return new SearchAnalyticsReporter(config, httpRequester);
}

/**
 * Provides a Pages Analytics service given a Pages specific config
 *
 * @remarks
 * Returns an analytics service instance.
 *
 * @param config - The Pages analytics config
 *
 * @public
 */
export function providePagesAnalytics(config: PagesAnalyticsConfig): PagesAnalyticsService {
  const httpRequester = new HttpRequester();
  return new PagesAnalyticsReporter(config, httpRequester);
}

/**
 * Provides a Conversion Tracking service given an optional debugging parameter
 *
 * @remarks
 * Returns a conversion tracking service instance
 *
 * @param debug - turn on console log debugging for tracked events
 *
 * @public
 */
export function provideConversionTrackingAnalytics(debug?: boolean): ConversionTrackingService {
  const httpRequester = new HttpRequester();
  return new ConversionTrackingReporter(httpRequester, debug);
}

/**
 * Provides a Chat Analytics service
 *
 * @remarks
 * Returns a conversion tracking service instance
 *
 * @public
 */
export function provideChatAnalytics(config: ChatAnalyticsConfig): ChatAnalyticsService {
  const httpRequester = new HttpRequester();
  return new ChatAnalyticsReporter(config, httpRequester);
}

export * from './models';
export {
  AnalyticsService,
  PagesAnalyticsService,
  SearchAnalyticsService,
  ConversionTrackingService,
  ChatAnalyticsService
} from './services';

export * from './utils';