export const coll = {
        findOne: jest.fn().mockImplementation(() => {        
            return 'provider';
        })
  };

export const getCollection = jest.fn().mockResolvedValue(coll);
