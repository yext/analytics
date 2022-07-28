import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { SearchAnalyticsReporter } from './infra/SearchAnalyticsReporter';
import { PagesAnalyticsReporter } from './infra/PagesAnalyticsReporter';
import { AnalyticsConfig, PagesAnalyticsConfig, SearchAnalyticsConfig } from './models';
import { AnalyticsService, SearchAnalyticsService, PagesAnalyticsService } from './services';

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

export * from './models';
export { AnalyticsService, PagesAnalyticsService, SearchAnalyticsService } from './services';
export { AnalyticsReporter, PagesAnalyticsReporter, SearchAnalyticsReporter };