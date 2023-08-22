import { EventPayload } from './EventPayload';

/**
 * Used for merging request JSON into an existing EventPayload.
 * Returns a new EventPayload, with the original object uneffected.
 * The merge occurs using the following conventions:
 *
 *  Merging an existing key with null/undefined deletes the key.
 *  Merging an existing key with non-null value update the value.
 *  Merging a non-existing key adds the key/value.
 *  When the value is an object, the above is applied recursivley.
 */
export const merge = (original: EventPayload, newValues: Partial<Record<keyof EventPayload, unknown>>): EventPayload => {
  const copy: Record<string, unknown> = { ...original };

  for (const key in newValues) {
    if (newValues.hasOwnProperty(key)) {
      const value = (newValues as Record<string, unknown>)[key];
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
