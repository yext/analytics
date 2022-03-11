import { AnalyticsConfig } from './models/AnalyticsConfig';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsService } from './services/AnalyticsService';

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
export function provideAnalytics(config: AnalyticsConfig): AnalyticsService {
  const httpRequester = new HttpRequester();

  return new AnalyticsReporter(config, httpRequester);
}

export * from './models';
export { AnalyticsService } from './services/AnalyticsService';