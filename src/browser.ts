import {EventPayload} from "./EventPayload";

/**
 * Determines whether the keepAlive init param is supported in the browser.
 *
 * @param body the EventPayload object
 */
const useBeacon = (body: EventPayload) => {
    const agent = body.browserAgent;
    // keepAlive is not supported in Firefox or Firefox for Android
    return (agent && agent.browser && agent.browser.toLowerCase().startsWith('firefox'))
        || (navigator.userAgent && navigator.userAgent.toLowerCase().includes('firefox'));
}

export default useBeacon;
