import { EventPayload } from '../src/EventPayload';
import { EventAPIResponse } from '../src/EventAPIResponse';
import { postWithBeacon, postWithFetch, useBeacon } from '../src/post';
const fetchMock = /** @type {FetchMockJest} */ (require('fetch-mock-jest'));

describe('Test post util function', () => {

  beforeEach(() => {
    const navigator = { userAgent: 'Firefox', sendBeacon: () => { return true; }};
    Object.defineProperty(window, 'navigator', { value: navigator, writable: true});
  });

  const eventResponseA: EventAPIResponse = {
    id: 'event-id-A'
  };

  const eventPayloadA: EventPayload = {
    action: 'ADD_TO_CART',
    locale: 'en_US',
  };

  const url = 'https://dev.us.yextevents.com/accounts/me/events';

  const optionsA = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(eventPayloadA), keepalive: true};

  fetchMock.post(url, JSON.stringify(eventResponseA));

  it('should use fetch', () => {
    // userAgent is Firefox but forceFetch = true
    let result = useBeacon(eventPayloadA, true);
    expect(result).toBe(false);

    const navigator = { userAgent: 'Chrome' };
    Object.defineProperty(window, 'navigator', { value: navigator, writable: true});

    // userAgent is Chrome and forceFetch = false
    result = useBeacon(eventPayloadA, false);
    expect(result).toBe(false);

    // userAgent is Chrome and forceFetch = true
    result = useBeacon(eventPayloadA, true);
    expect(result).toBe(false);
  });

  it('should use beacon', () => {
    // userAgent is Firefox
    const result = useBeacon(eventPayloadA, false);
    expect(result).toBe(true);
  });

  it('should send fetch request', async () => {
    // forceFetch: true
    await postWithFetch(url, eventPayloadA);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(1);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events')[0][1]).toEqual(optionsA);

    // forceFetch: false, but browser is not Firefox
    const navigator = { userAgent: 'Chrome', sendBeacon: () => { return true; }};
    Object.defineProperty(window, 'navigator', { value: navigator, writable: true});
    await postWithFetch(url, eventPayloadA);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(2);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events')[1][1]).toEqual(optionsA);

    // forceFetch: true, browser is not Firefox
    await postWithFetch(url, eventPayloadA);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(3);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events')[2][1]).toEqual(optionsA);

    fetchMock.mockClear();
  });

  it('should send beacon request', async () => {
    // forceFetch: false and browser defined in navigator is Firefox
    const result =await postWithBeacon(url, eventPayloadA);
    expect(fetchMock.calls('https://dev.us.yextevents.com/accounts/me/events').length).toEqual(0);
    expect(result).toBe(true);
  });
});