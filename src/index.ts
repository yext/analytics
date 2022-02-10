import { AnalyticsConfig } from './models/AnalyticsConfig';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { HttpRequester } from './infra/HttpRequester';

/**
 * The entrypoint to the analytics library.
 *
 * @remarks
 * Returns an {@link AnswersReporter} instance.
 *
 * @param config - The analytics config
 *
 * @public
 */
export function provideAnalytics(config: AnalyticsConfig): AnalyticsReporter {
  const httpRequester = new HttpRequester();

  return new AnalyticsReporter(config, httpRequester);
}

export * from './models';