import { EventPayload } from './EventPayload';

/**
 * Used for merging request JSON into an existing EventPayload.
 * Returns a new EventPayload, with the original object unaffected.
 * The merge occurs using the following conventions:
 *
 *  Merging an existing key with null/undefined deletes the key.
 *  Merging an existing key with non-null value updates the value.
 *  Merging a non-existing key adds the key/value.
 *  When the value is an object, the above is applied iteratively.
 */
export const merge = (
  original: EventPayload,
  newValues: Partial<Record<keyof EventPayload, unknown>>
): EventPayload => {
  const copy: Record<string, unknown> = { ...original };
  const stack: Array<[Record<string, unknown>,
     Partial<Record<keyof EventPayload, unknown>>]> = [[copy, newValues]];

  while (stack.length) {
    const [target, source] = stack.pop() || [];
    if (target && source) {
      Object.keys(source).forEach((key) => {
        const value = source[key as keyof EventPayload];
        if (value === null || value === undefined) {
          delete target[key];
        } else if (typeof value !== 'object') {
          target[key] = value;
        } else {
          if (!target[key]) {
            target[key] = {};
          }
          stack.push([target[key] as Record<keyof EventPayload, unknown>, value]);
        }
      });
    }
  }

  return {
    ...copy,
    action: copy.action as EventPayload['action']
  };
};
