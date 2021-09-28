import { AnalyticsConfig } from './models/AnalyticsConfig';
import { AnalyticsReporter } from './infra/AnalyticsReporter';
import { Requester } from './infra/Requester';
 
/**
 * The entrypoint to the answers-analytics library.
 *
 * @remarks
 * Returns an {@link AnswersReporter} instance.
 *
 * @param config - The answers-analytics config
 *
 * @public
 */
export function provideAnalytics(config: AnalyticsConfig): AnalyticsReporter {
  const httpRequester = new Requester();

  return new AnalyticsReporter(config, httpRequester);
}

export * from './models';