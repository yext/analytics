import { ChatEventPayLoad, EventAPIResponse } from '../models/chat';
import { ChatAnalyticsConfig } from '../models/config/ChatAnalyticsConfig';
import { HttpRequesterService } from '../services';
import { getOrSetupSessionId } from '../utils/getOrSetupSessionId';
import { getChatEndpoint } from '../utils/endpointProviders';

/**
 * A class to report chat analytics data. Uses the provided API key, environment,
 * and partition to determine the endpoint for reporting events.
 *
 * @public
 */
export class ChatAnalyticsReporter {
  /** A Yext API Key with access to Analytics */
  private readonly apiKey: string;
  /**
   * The endpoint to report events to, inferred by the env and region
   * when the endpoint field from config is not provided.
   */
  private readonly endpoint: string;
  /** Whether to enable session tracking for analytics events */
  private readonly sessionTrackingEnabled: boolean;

  constructor(
    {
      apiKey,
      env,
      region = 'US',
      endpoint,
      sessionTrackingEnabled = region === 'US'
    }: ChatAnalyticsConfig,
    private httpRequesterService: HttpRequesterService
  ) {
    this.apiKey = apiKey;
    this.sessionTrackingEnabled = sessionTrackingEnabled;
    this.endpoint = endpoint ?? getChatEndpoint(region, env);
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

    const sessionId: string | undefined = this.sessionTrackingEnabled
      ? (event.sessionId ?? getOrSetupSessionId() ?? undefined)
      : undefined;
    const res = await this.httpRequesterService.post(
      this.endpoint,
      {
        ...event,
        sessionId
      },
      headers);

    if (!res.ok) {
      const body: EventAPIResponse = await res.json();
      let errorMessage = `Events API responded with ${res.status}: ${res.statusText}`;
      body.errors?.forEach(e => errorMessage += `\nError: ${e}.`);
      throw new Error(errorMessage);
    }
    const resJson = await res.json();
    return resJson;
  }
}
