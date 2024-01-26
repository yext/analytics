import { EventPayload } from './EventPayload';

/**
 * Used for merging request JSON into an existing EventPayload.
 * Returns a new EventPayload, with the original object unaffected.
 * The merge occurs using the following conventions:
 *
 *  Merging an existing key with null/undefined deletes the key.
 *  Merging an existing key with non-null value updates the value.
 *  Merging a non-existing key adds the key/value.
 *  When the value is an object, the above is applied recursivley.
 */
const merge = (
  original: EventPayload,
  newValues: EventPayload
): EventPayload => {
  if (!newValues || Object.keys(newValues).length === 0) {
    return original;
  } else if (!original || Object.keys(original).length === 0) {
    return newValues;
  }

  const copy = JSON.parse(JSON.stringify(original));

  for (const key in newValues) {
    if (newValues.hasOwnProperty(key)) {
      const value = newValues[key as keyof EventPayload];
      if (value === null || value === undefined) {
        delete copy[key];
      } else if (typeof value !== 'object') {
        copy[key] = value;
      } else {
        copy[key] = merge(
          copy[key] as EventPayload,
          value as Record<string, unknown>
        );
      }
    }
  }

  return {
    ...copy
  };
};

export default merge;
