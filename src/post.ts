import {EventPayload} from './EventPayload';

const post = (
    url: string,
    body: EventPayload
) => {
    return navigator.sendBeacon(url, JSON.stringify(body));
}

export default post;
