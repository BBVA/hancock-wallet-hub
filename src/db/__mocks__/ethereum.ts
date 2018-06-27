export const coll = {
        findOne: jest.fn().mockImplementation(() => {
            return 'provider';
        }),
  };

// tslint:disable-next-line:variable-name
export const _getCollection = jest.fn().mockResolvedValue(coll);
