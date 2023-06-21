import type { EventPayload } from '../models/chat';
import type ChatAnalyticsConfig from '../models/config/ChatAnalyticsConfig';

interface EventsAPIResponse {
  id: string;
}

/**
 * A class to report chat analytics data. Uses the provided API key, environment,
 * and partition to determine the endpoint for reporting events.
 */
export default class ChatAnalyticsReporter {
  public readonly apiKey: string;
  public readonly env: NonNullable<ChatAnalyticsConfig['env']>;
  public readonly partition: NonNullable<ChatAnalyticsConfig['partition']>;
  public readonly endpoint: string;

  private endpoints: Record<
    NonNullable<ChatAnalyticsConfig['partition']>,
    Record<NonNullable<ChatAnalyticsConfig['env']>, string>
  > = {
    US: {
      PROD: 'https://www.us.yextevents.com/accounts/me/events',
      SANDBOX: 'https://www.sbx.us.yextevents.com/accounts/me/events',
      QA: 'https://www.qa.us.yextevents.com/accounts/me/events',
    },
    EU: {
      PROD: 'https://www.eu.yextevents.com/accounts/me/events',
      SANDBOX: 'https://www.sbx.eu.yextevents.com/accounts/me/events',
      QA: 'https://www.qa.eu.yextevents.com/accounts/me/events',
    }
  };

  constructor({ apiKey, env, partition }: ChatAnalyticsConfig) {
    this.apiKey = apiKey;
    this.env = env ?? 'PROD';
    this.partition = partition ?? 'US';
    this.endpoint = this.endpoints[this.partition][this.env];
  }

  /**
   * Report an event to the chat analytics API.
   * @param event The event to report.
   * @returns A promise that resolves to the response from the API.
   * @example
   * reporter.report({
   *  action: 'DIRECTIONS',
   *   chat: {
   *   botId: 'davish-playground',
   * },
   * });
   * // Response
   * {
   *  id: '12345',
   * }
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
