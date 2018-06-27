export const coll = {
    findOne: jest.fn().mockImplementation(() => {
        return 'provider';
    })
};

export const _getCollection = jest.fn().mockResolvedValue(coll);
