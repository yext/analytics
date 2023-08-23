import { EventPayload } from '../src/EventPayload';
import { EventAPIResponse } from '../src/EventAPIResponse';
import post from '../src/post';
const fetchMock = /** @type {FetchMockJest} */ (require('fetch-mock-jest'));

describe('Test post util function', () => {

    beforeEach(() => {
        const navigator = { userAgent: 'Firefox', sendBeacon: () => { return true }};
        Object.defineProperty(window, 'navigator', { value: navigator, writable: true});
    });

    const eventResponseA: EventAPIResponse = {
        id: 'event-id-A'
    }

    const eventPayloadA: EventPayload = {
        action: 'ADD_TO_CART',
        locale: 'en_US',
    };

    const eventPayloadB: EventPayload = {
        action: 'ADD_TO_CART',
        locale: 'en_US',
        browserAgent: {
            browser: 'Firefox'
        }
    };

    const url = 'https://dev.us.yextevents.com/accounts/me/events';

    const optionsA = {method: 'POST', body: JSON.stringify(eventPayloadA), keepalive: true};

    fetchMock.post(url, JSON.stringify(eventResponseA));

    it('should send fetch request', async () => {
        // forceFetch: true
        await post(url, eventPayloadA, true);
        expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events')[0][1]).toEqual(optionsA);

        // forceFetch: false, but browser is not Firefox
        const navigator = { userAgent: 'Chrome', sendBeacon: () => { return true }};
        Object.defineProperty(window, 'navigator', { value: navigator, writable: true});
        await post(url, eventPayloadA, false);
        expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events')[1][1]).toEqual(optionsA);

        fetchMock.mockClear();
    })

    it('should send beacon request', async () => {
        // forceFetch: false and browser defined in navigator is Firefox
        let result = await post(url, eventPayloadA, false);
        expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(0);
        expect(result).toBe(true);

        // forceFetch: false and browser defined in EventPayload object is Firefox
        const navigator = { sendBeacon: () => { return true }};
        Object.defineProperty(window, 'navigator', { value: navigator, writable: true});
        result = await post(url, eventPayloadB, false);
        expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(0);
        expect(result).toBe(true);
    })
})
