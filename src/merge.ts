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
export const merge = (original: EventPayload, newValues: Partial<PartialPayload>): EventPayload => {
  const copy = { ...original };
  const stack: Array<[PartialPayload, PartialPayload]> = [[copy, newValues]];

  while (stack.length) {
    const [target, source] = stack.pop() || [];
    if (target && source) {
      Object.keys(source).forEach((key) => {
        const EventKey = key as keyof EventPayload;
        const value = source[EventKey];
        if (value === null || value === undefined) {
          delete target[EventKey];
        } else if (typeof value !== 'object') {
          target[EventKey] = value;
        } else {
          if (!target[EventKey]) {
            target[EventKey] = {};
          }
          stack.push([target[EventKey] as PartialPayload, value]);
        }
      });
    }
  }

  return {
    ...copy,
    action: copy.action as EventPayload['action']
  };
};

type PartialPayload = Partial<Record<keyof EventPayload, unknown>>;
