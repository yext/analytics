import type { EventPayload } from '../models/chat';
import type ChatAnalyticsConfig from '../models/config/ChatAnalyticsConfig';

interface EventsAPIResponse {
  id: string;
}

/**
 * @public
 * A class to report chat analytics data. Uses the provided API key, environment,
 * and partition to determine the endpoint for reporting events.
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
    Record<NonNullable<ChatAnalyticsConfig['env']>, string>
  > = {
    US: {
      PROD: 'https://www.us.yextevents.com/accounts/me/events',
      SANDBOX: 'https://www.sbx.us.yextevents.com/accounts/me/events',
    },
    EU: {
      PROD: 'https://www.eu.yextevents.com/accounts/me/events',
      SANDBOX: 'https://www.sbx.eu.yextevents.com/accounts/me/events',
    }
  };

  constructor({ apiKey, env, region }: ChatAnalyticsConfig) {
    this.apiKey = apiKey;
    this.env = env ?? 'PROD';
    this.region = region ?? 'US';
    this.endpoint = this.endpoints[this.region][this.env];
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

  public async report(event: EventPayload): Promise<EventsAPIResponse> {

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `KEY ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      throw new Error(
        `Events API responded with ${res.status}. ${res.statusText}`
      );
    }
    const resJson = await res.json();
    return resJson as EventsAPIResponse;
  }
}
