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
export const merge = (original: EventPayload, newValues: PartialPayload): EventPayload => {
  const copy = JSON.parse(JSON.stringify(original));
  const stack: Array<[PartialPayload, PartialPayload]> = [[copy, newValues]];

  while (stack.length) {
    const [target, source] = stack.pop() ?? [];
    if (target && source) {
      Object.keys(source).forEach((key) => {
        const eventKey = key as keyof EventPayload;
        const value = source[eventKey];
        if (value === null || value === undefined) {
          target[eventKey] = undefined;
        } else if (typeof value !== 'object') {
          target[eventKey] = value;
        } else {
          if (!target[eventKey]) {
            target[eventKey] = {};
          }
          stack.push([target[eventKey] as PartialPayload, value]);
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
