import { convertTypesGTM } from '../src/convertTypesGTM';

describe('convertTypesGTM Test', () => {
  it('should convert string represented numbers to numerical type - standard case', () => {
    const payload = {
      action: 'ADD_TO_CART',
      count: '5',
      search: {
        versionNumber: '5'
      },
      sites: {
        siteUId: '5'
      }
    };

    const result = convertTypesGTM(payload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      count: 5,
      search: {
        versionNumber: 5
      },
      sites: {
        siteUId: 5
      }
    });
  });

  it('should convert string represented numbers to numerical type - entity is Number', () => {
    const payload = {
      action: 'ADD_TO_CART',
      entity: '1234'
    };

    const result = convertTypesGTM(payload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      entity: 1234
    });
  });

  it('should convert string represented numbers to numerical type - entity is string', () => {
    const payload = {
      action: 'ADD_TO_CART',
      entity: 'myEntity'
    };

    const result = convertTypesGTM(payload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      entity: 'myEntity'
    });
  });

  it('should convert customValues properly', () => {
    const payload = {
      action: 'ADD_TO_CART',
      customValues: {
        myCustomVal: '5',
        myCustomVal2: '1234'
      }
    };

    const result = convertTypesGTM(payload);

    expect(result).toEqual({
      action: 'ADD_TO_CART',
      customValues: {
        myCustomVal: 5,
        myCustomVal2: 1234
      }
    });
  });
});
