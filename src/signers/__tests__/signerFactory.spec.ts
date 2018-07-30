import 'jest';
import * as ethereumDb from '../../db/ethereum';
import { SIGNERS } from '../../types';
import * as db from '../../utils/db';
import * as cryptvaultSigner from '../cryptvaultSigner';
import * as signer from '../signer';
import { getSigner } from '../signerFactory';

jest.mock('../../utils/config');
jest.mock('../../utils/db');
jest.mock('../../utils/logger');
jest.mock('mongodb');
jest.mock('../signer');
jest.mock('../cryptvaultSigner');

describe('getSigner', async () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('::getCollection should return the collection successfully to call signer', async () => {

    const getDbMock = (db.getDb as jest.Mock);

    const dbClientMock = ((db as any).__client__);

    await getSigner('whateverProvider');

    expect(getDbMock.mock.calls.length).toBe(1);

    expect(getDbMock.mock.calls).toEqual([['mockDatabase']]);

    expect(dbClientMock.collection.mock.calls.length).toBe(1);

    expect(dbClientMock.collection.mock.calls).toEqual([['mockDatabaseCollectionProviders']]);

  });

  it('::getSigner should return the signer successfully', async () => {

    const response = await getSigner('whatever');

    expect(signer.Signer).toHaveBeenCalledTimes(1);
    expect(response).toEqual((signer as any).__signerInstance__);

  });

  it('::getSigner should return the cryptvaultSigner successfully', async () => {

    (ethereumDb as any).getProviderByAlias = jest.fn().mockResolvedValue(Promise.resolve({
      alias: 'string',
      className: SIGNERS.CryptvaultSigner,
      endpoint: 'string',
    }));
    const response = await getSigner('whatever');

    expect(cryptvaultSigner.CryptvaultSigner).toHaveBeenCalledTimes(1);
    expect(response).toEqual((cryptvaultSigner as any).__cryptvaultSignerInstance__);

  });
});
