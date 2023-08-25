import { AnalyticsEventReporter } from './AnalyticsEventReporter';
import {Environment} from './Environment';
import {Region} from './Region';

/**
 * The main configuration options for Analytics Events.
 *
 * @public
 */
export interface AnalyticsConfig {
    /** The API Key or OAuth for accessing the Analytics Events API
     * Only one of key or bearer should be set.
     * */
    key?: string;
    /** The bearer token for accessing the Analytics Events API.
     * Only one of key or bearer should be set.
     * */
    bearer?: string;
    /** The Yext environment to send requests to. Defaults to 'PRODUCTION'. */
    env?: Environment;
    /** The region to send requests to. Defaults to 'US'. */
    region?: Region;
    /**
     * Whether to enable session tracking for analytics events.
     * Defaults to true for both environments
     * @remarks
     * This generates a ULID to tie together events in a single browsing session.
     */
    sessionTrackingEnabled?: boolean;
    /**
     * Used to force sending the POST request via fetch + keepalive.
     * If the browser supports fetch + keep alive, defaults to true.
     * If it does not, defaults to false and beacon will be used.
     */
    forceFetch?: boolean;
}