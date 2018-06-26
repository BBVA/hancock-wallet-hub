import 'jest';

import * as db from '../../utils/db';

import * as ethereumDb from '../../db/ethereum';

import {getSigner} from '../signerFactory';

jest.mock('../../utils/config');

jest.mock('../../utils/db');

jest.mock('mongodb');

describe('getSigner', async () => {



    it('::getCollection should return the collection successfully to call signer', async () => {
  
      const getDbMock = (db.getDb as jest.Mock);
  
      const dbClientMock = ((db as any).__client__);
  
      await getSigner('whateverProvider');
  
      expect(getDbMock.mock.calls.length).toBe(1);
  
      expect(getDbMock.mock.calls).toEqual([['mockDatabase']]);
  
      expect(dbClientMock.collection.mock.calls.length).toBe(1);
  
      expect(dbClientMock.collection.mock.calls).toEqual([['mockDatabaseCollectionProviders']]);
  
    });
});