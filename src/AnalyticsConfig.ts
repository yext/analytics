import {Environment} from './models';
import {Region} from './models';

/**
 * The main configuration options for Analytics Events.
 *
 * @public
 */
export interface AnalyticsConfig {
    key?: string;
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
}
