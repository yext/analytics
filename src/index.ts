import { AnalyticsConfig } from './models/AnalyticsConfig';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { HttpRequester } from './infra/HttpRequester';
import { AnalyticsService } from './services';

/**
 * The entrypoint to the analytics library.
 *
 * @remarks
 * Returns an {@link AnalyticsReporter} instance.
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
export * from './services';
export { AnalyticsReporter };