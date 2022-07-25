import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { SearchAnalyticsReporter } from './infra/SearchAnalyticsReporter';
import { PagesAnalyticsReporter } from './infra/PagesAnalyticsReporter';
import { AnalyticsConfig, PagesAnalyticsConfig, SearchAnalyticsConfig } from './models';
import { AnalyticsService, SearchAnalyticsService, PagesAnalyticsService } from './services';

/**
 * The entrypoint to the analytics library.
 *
 * @remarks
 * Returns an analytics service instance.
 *
 * @param config - The analytics config
 *
 * @public
 */
export function provideAnalytics(
  config: SearchAnalyticsConfig|AnalyticsConfig|PagesAnalyticsConfig
): AnalyticsService|PagesAnalyticsService|SearchAnalyticsService {
  const httpRequester = new HttpRequester();

  const isSearch = (config as SearchAnalyticsConfig).isSearch;
  const isPages = (config as PagesAnalyticsConfig).isPages;
  const isBoth = isSearch && isPages;

  if (isBoth) {
    return new AnalyticsReporter((config as AnalyticsConfig), httpRequester);
  } else if (isSearch) {
    return new SearchAnalyticsReporter(config as SearchAnalyticsConfig, httpRequester);
  } else if (isPages) {
    return new PagesAnalyticsReporter((config as PagesAnalyticsConfig), httpRequester);
  }
}

export * from './models';
export { AnalyticsService, SearchAnalyticsService, PagesAnalyticsService } from './services';
