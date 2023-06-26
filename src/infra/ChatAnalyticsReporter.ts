import { ChatEventPayLoad, EventAPIResponse } from '../models/chat';
import { ChatAnalyticsConfig } from '../models/config/ChatAnalyticsConfig';
import { HttpRequesterService } from '../services';

/**
 * A class to report chat analytics data. Uses the provided API key, environment,
 * and partition to determine the endpoint for reporting events.
 *
 * @public
 */
export class ChatAnalyticsReporter {
  /** A Yext API Key with access to Analytics */
  public readonly apiKey: string;
  /** The Yext environment (PROD or SANDBOX) */
  public readonly env: NonNullable<ChatAnalyticsConfig['env']>;
  /** The Yext region (US or EU) */
  public readonly region: NonNullable<ChatAnalyticsConfig['region']>;
  /** The endpoint to report events to, inferred by the env and region */
  public readonly endpoint: string;

  private endpoints: Record<
    NonNullable<ChatAnalyticsConfig['region']>,
    Partial<Record<NonNullable<ChatAnalyticsConfig['env']>, string>>
  > = {
    US: {
      PROD: 'https://www.us.yextevents.com/accounts/me/events',
      SANDBOX: 'https://www.sbx.us.yextevents.com/accounts/me/events',
    },
    EU: {
      PROD: 'https://www.eu.yextevents.com/accounts/me/events',
    }
  };

  constructor(
    { apiKey, env, region }: ChatAnalyticsConfig,
    private httpRequesterService: HttpRequesterService
  ) {
    this.apiKey = apiKey;
    this.env = env ?? 'PROD';
    this.region = region ?? 'US';
    const endpoint = this.endpoints[this.region][this.env];
    if (!endpoint) {
      throw Error(`Endpoint for env "${env}" and region "${region}" is not supported.`);
    }
    this.endpoint = endpoint;
  }

  /**
   * Report an event to the chat analytics API.
   * @param event - The event to report.
   * @returns A promise that resolves to the response from the API.
   * @example
   *
   * ```ts
   * reporter.report({
   *   action: 'DIRECTIONS',
   *   chat: {
   *     botId: 'davish-playground',
   *   },
   * });
   * // Response
   * {
   *   id: '12345',
   * }
   * ```
   */
  public async report(event: ChatEventPayLoad): Promise<EventAPIResponse> {
    const headers: Record<string, string> = {
      Authorization: `KEY ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
    const res = await this.httpRequesterService.post(
      this.endpoint,
      event,
      headers);

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Events API responded with ${res.status}. ${res.statusText}: ${errorMessage}`
      );
    }
    const resJson = await res.json();
    return resJson;
  }
}
