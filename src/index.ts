import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { ConversionTrackingReporter } from './infra/ConversionTrackingReporter';
import { SearchAnalyticsReporter } from './infra/SearchAnalyticsReporter';
import { PagesAnalyticsReporter } from './infra/PagesAnalyticsReporter';
import { AnalyticsConfig, PagesAnalyticsConfig, SearchAnalyticsConfig } from './models';
import { AnalyticsService, SearchAnalyticsService, PagesAnalyticsService, ConversionTrackingService } from './services';

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

export * from './models';
export {
  AnalyticsService,
  PagesAnalyticsService,
  SearchAnalyticsService,
  ConversionTrackingService,
} from './services';

export * from './utils';