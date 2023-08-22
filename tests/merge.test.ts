import { EventPayload } from '../src/EventPayload';
import { merge } from '../src/merge';

describe('Merge Function', () => {
    it('should merge example 1 correctly', () => {
        const event1: EventPayload = {
            action: 'APPLY',
            bot: false,
            locale: 'en_US',
        };

        const event2: Record<string, unknown> = {
            label: 'label',
            bot: null,
            locale: 'en_UK',
        };

        const result = merge(event1, event2);

        const expected: EventPayload = {
            label: 'label',
            locale: 'en_UK',
            action: 'APPLY'
        };
        expect(result).toEqual(expected);
    });

    it('should merge example 2 correctly', () => {
        const event1: EventPayload = {
            action: 'APPLY',
            chat: {
                botId: 'botId',
            }
        };

        const event2: Record<string, unknown> = {
            action: 'APPLY',
            chat: {
                responseId: 'responseId',
            }
        };

        const result = merge(event1, event2);

        const expected: EventPayload = {
            action: 'APPLY',
            chat: {
                botId: 'botId',
                responseId: 'responseId',
            }
        };

        expect(result).toEqual(expected);
    });

    it('should merge example 3 correctly', () => {
        const event1: EventPayload = {
            action: 'APPLY',
            browserAgent: {
                os: 'MacOS',
                browser: 'Chrome',
                device: 'MacBook Pro',
            },
            ip: {
                address: '0.0.0.0',
            },
        };

        const event2: Record<string, unknown> = {
            action: 'ADD_TO_CART',
            browserAgent: {
                os: undefined,
                browser: 'Safari',
                device: 'MacBook Air',
                deviceClass: 'Desktop',
            },
            ip: {
                address: '0.0.0.1',
                algorithm: 'hash',
            },
        };

        const result = merge(event1, event2);

        const expected: EventPayload = {
            action: 'ADD_TO_CART',
            browserAgent: {
                browser: 'Safari',
                device: 'MacBook Air',
                deviceClass: 'Desktop',
            },
            ip: {
                address: '0.0.0.1',
                algorithm: 'hash',
            },
        };

        expect(result).toEqual(expected);
    });
});
