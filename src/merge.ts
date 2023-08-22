import { EventPayload } from './EventPayload';

/** Used for merging request JSON into an existing EventPayload.
 * Returns a new EventPayload, with the original object uneffected.
 */
export const merge = (original: EventPayload, newValues: Record<string, unknown>): EventPayload => {
  const copy: Record<string, unknown> = { ...original };

  for (const key in newValues) {
    if (newValues.hasOwnProperty(key)) {
      const value = newValues[key];
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
