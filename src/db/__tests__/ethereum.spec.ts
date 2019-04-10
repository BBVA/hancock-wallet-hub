import 'jest';

import * as ethereumDb from '../../db/ethereum';
import * as db from '../../utils/db';

jest.mock('../../utils/config');
jest.mock('../../utils/db');
jest.mock('../../utils/logger');
jest.mock('mongodb');

describe('dbEthereum', async () => {

  it('::getCollection should return the mongodb collection successfully', async () => {

    const getDbMock = (db.getDb as jest.Mock);

    const dbClientMock = ((db as any).__client__);

    await ethereumDb._getCollection('whateverCollectionToRetrieve');

    expect(getDbMock.mock.calls.length).toBe(1);

    expect(getDbMock.mock.calls).toEqual([['mockDatabase']]);

    expect(dbClientMock.collection.mock.calls.length).toBe(1);

    expect(dbClientMock.collection.mock.calls).toEqual([['whateverCollectionToRetrieve']]);

  });

  describe('with contracts collection', async () => {

    let getColl: jest.Mock;

    let coll: any;

    const collName: string = 'mockDatabaseCollectionContracts';

    const collProvider: string = 'mockDatabaseCollectionProviders';

    beforeAll(() => {

      coll = ((db as any).__collection__);

      (ethereumDb._getCollection as any) = jest.fn().mockResolvedValue(coll);

      getColl = (ethereumDb._getCollection as jest.Mock);

    });

    beforeEach(() => {

      jest.clearAllMocks();

    });

    it('::getContractByAddress should call getCollection and call dbClient.findOne with params', async () => {

      const mockedAddress: string = 'mockAddress';

      await ethereumDb.getContractByAddress(mockedAddress);

      expect(getColl).toHaveBeenCalledWith(collName);

      expect(coll.findOne).toHaveBeenCalledWith({ address: mockedAddress });

    });

    it('::getProviderByAlias should call getCollection and call dbClient.findOne with params', async () => {

      const mockedAlias: string = 'mockAlias';

      await ethereumDb.getProviderByAlias(mockedAlias);

      expect(getColl).toHaveBeenCalledWith(collProvider);

      expect(coll.findOne).toHaveBeenCalledWith({ alias: mockedAlias });

    });

  });

});
