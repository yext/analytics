import { EventPayload } from './EventPayload';

/** Used for merging request JSON into an existing EventPayload. Returns a new EventPayload object */
export const merge = (json1: EventPayload, json2: Record<string, unknown>): EventPayload => {
    const copy: Record<string, unknown> = { ...json1 };

    for (const key in json2) {
        if (json2.hasOwnProperty(key)) {
            const value = json2[key];
            if (value === null || value === undefined) {
                delete copy[key];
            } else if (typeof value !== 'object') {
                copy[key] = value;
            } else {
                copy[key] = merge(copy[key] as EventPayload, value as Record<string, unknown>);
            }
        }
    }

    const result: EventPayload = {
        ...copy,
        action: copy.action as EventPayload['action']
    };
    return result;
};
