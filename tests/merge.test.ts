import { EventPayload } from '../src/EventPayload';
import merge from '../src/merge';

describe('Merge Function Test', () => {
  it('should merge primitives values correctly', () => {
    const event1: EventPayload = {
      action: 'APPLY',
      bot: false,
      locale: 'en_US'
    };

    const unaffectedEvent1: EventPayload = JSON.parse(JSON.stringify(event1));

    const event2 = {
      label: 'label',
      bot: null,
      locale: 'en_UK'
    };

    const result = merge(event1, event2);

    const expected: EventPayload = {
      label: 'label',
      locale: 'en_UK',
      action: 'APPLY'
    };

    expect(result).toEqual(expected);
    expect(event1).toEqual(unaffectedEvent1); // confirm event1 unaffected
  });

  it('should merge objects with no overlap correctly', () => {
    const event1: EventPayload = {
      action: 'APPLY',
      chat: {
        botId: 'botId'
      }
    };

    const unaffectedEvent1: EventPayload = JSON.parse(JSON.stringify(event1));

    const event2 = {
      action: 'APPLY',
      browserAgent: {
        device: 'iPhone',
        deviceClass: 'Mobile'
      },
      chat: {
        responseId: 'responseId'
      }
    };

    const result = merge(event1, event2);

    const expected: EventPayload = {
      action: 'APPLY',
      browserAgent: {
        device: 'iPhone',
        deviceClass: 'Mobile'
      },
      chat: {
        botId: 'botId',
        responseId: 'responseId'
      }
    };

    expect(result).toEqual(expected);
    expect(event1).toEqual(unaffectedEvent1); // confirm event1 unaffected
  });

  it('should merge primitives and objects (with overlap) correctly', () => {
    const event1: EventPayload = {
      action: 'APPLY',
      browserAgent: {
        os: 'MacOS',
        browser: 'Chrome',
        device: 'MacBook Pro'
      },
      ip: {
        address: '0.0.0.0'
      }
    };

    const unaffectedEvent1: EventPayload = JSON.parse(JSON.stringify(event1));
    const event2 = {
      action: 'C_CUSTOM_ACTION',
      browserAgent: {
        os: undefined,
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };

    const result = merge(event1, event2);

    const expected: EventPayload = {
      action: 'C_CUSTOM_ACTION',
      browserAgent: {
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };

    expect(result).toEqual(expected);
    expect(event1).toEqual(unaffectedEvent1); // confirm event1 unaffected
  });

  it('should merge correctly when original is empty', () => {
    const event1: EventPayload = {};

    const event2: EventPayload = {
      action: 'ADD_TO_CART',
      browserAgent: {
        os: undefined,
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };

    const result = merge(event1, event2);

    const expected: EventPayload = {
      action: 'ADD_TO_CART',
      browserAgent: {
        os: undefined,
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };

    expect(result).toEqual(expected);
  });

  it('should merge correctly when the new payload is empty', () => {
    const event1: EventPayload = {
      action: 'ADD_TO_CART',
      browserAgent: {
        os: undefined,
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };
    const event2: EventPayload = {};

    const result = merge(event1, event2);

    const expected: EventPayload = {
      action: 'ADD_TO_CART',
      browserAgent: {
        os: undefined,
        browser: 'Safari',
        device: 'MacBook Air',
        deviceClass: 'Desktop'
      },
      ip: {
        address: '0.0.0.1',
        algorithm: 'hash'
      }
    };

    expect(result).toEqual(expected);
  });

  it('should merge objects with no action property correctly', () => {
    const event1: EventPayload = {
      chat: {
        botId: 'botId'
      }
    };

    const unaffectedEvent1: EventPayload = JSON.parse(JSON.stringify(event1));

    const event2 = {
      browserAgent: {
        device: 'iPhone',
        deviceClass: 'Mobile'
      },
      chat: {
        responseId: 'responseId'
      }
    };

    const result = merge(event1, event2);

    const expected: EventPayload = {
      browserAgent: {
        device: 'iPhone',
        deviceClass: 'Mobile'
      },
      chat: {
        botId: 'botId',
        responseId: 'responseId'
      }
    };

    expect(result).toEqual(expected);
    expect(event1).toEqual(unaffectedEvent1); // confirm event1 unaffected
  });
});
