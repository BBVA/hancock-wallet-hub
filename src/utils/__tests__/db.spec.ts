import 'jest';

import * as db from '../../utils/db';

import * as ethereumDb from '../../db/ethereum';

import * as database from '../db';

jest.mock('../../utils/config');

jest.mock('../../utils/db');

jest.mock('mongodb');

// describe('connect', async () => {

//     it('::connect should return the collection successfully to call signer', async () => {
  
//       const dbClientMock = ((db as any).__client__);
  
//       await database.connect();
  
//       expect(dbClientMock.collection.mock.calls.length).toBe(1);
  
//       expect(dbClientMock.collection.mock.calls).toEqual([['mockDatabaseCollectionProviders']]);
  
//     });
// });

describe('getDb', () => {

  it('::getDb should return the collection successfully to call signer', async () => {

    const getDbMock = (db.getDb as jest.Mock);

    await database.getDb('mockDatabase');

    expect(getDbMock.mock.calls.length).toBe(1);

    expect(getDbMock.mock.calls).toEqual([['mockDatabase']]);

  });
});