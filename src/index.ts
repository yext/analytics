import {AnalyticsConfig, PagesAnalyticsConfig, SearchAnalyticsConfig} from './models/AnalyticsConfig';
import { SearchAnalyticsReporter } from './infra/SearchAnalyticsReporter';
import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsService } from './services';

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
  config: SearchAnalyticsConfig|AnalyticsConfig
): AnalyticsService {
  const httpRequester = new HttpRequester();

  return new SearchAnalyticsReporter(config, httpRequester);
}

export * from './models';
export { AnalyticsService } from './services/AnalyticsService';
