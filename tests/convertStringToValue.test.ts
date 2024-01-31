import { convertStringToValue } from '../src/convertStringToValue';

describe('convertTypesGTM Test', () => {
  it('should convert string represented numbers to numerical type - standard case', () => {
    const gtmPayload = {
      action: 'ADD_TO_CART',
      count: '5',
      search: {
        versionNumber: '5'
      },
      pages: {
        siteUid: '5'
      }
    };

    const result = convertStringToValue(gtmPayload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      count: 5,
      search: {
        versionNumber: 5
      },
      pages: {
        siteUid: 5
      }
    });
  });

  it('should convert string represented numbers to numerical type - entity is Number', () => {
    const gtmPayload = {
      action: 'ADD_TO_CART',
      entity: '1234'
    };

    const result = convertStringToValue(gtmPayload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      entity: 1234
    });
  });

  it('should convert string represented numbers to numerical type - entity is string', () => {
    const gtmPayload = {
      action: 'ADD_TO_CART',
      entity: 'myEntity'
    };

    const result = convertStringToValue(gtmPayload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      entity: 'myEntity'
    });
  });

  it('should convert customValues properly', () => {
    const gtmPayload = {
      action: 'ADD_TO_CART',
      customValues: {
        myCustomVal: '5',
        myCustomVal2: '1234'
      }
    };

    const result = convertStringToValue(gtmPayload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      customValues: {
        myCustomVal: 5,
        myCustomVal2: 1234
      }
    });
  });
  it('should convert string represented booleans to boolean type', () => {
    const gtmPayload = {
      action: 'ADD_TO_CART',
      bot: 'true',
      internalUser: 'false',
      search: {
        versionNumber: '5',
        isDirectAnswer: 'false'
      }
    };

    const result = convertStringToValue(gtmPayload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      bot: true,
      internalUser: false,
      search: {
        versionNumber: 5,
        isDirectAnswer: false
      }
    });
  });
  it('test convert AnayticsConfig - should convert sessionTrackingEnabled', () => {
    const analyticsConfig = {
      key: 'apiKey',
      sessionTrackingEnabled: 'false',
      region: 'US'
    };

    const result = convertStringToValue(analyticsConfig);

    expect(result).toEqual({
      key: 'apiKey',
      sessionTrackingEnabled: false,
      region: 'US'
    });
  });
});
