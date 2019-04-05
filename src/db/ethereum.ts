import {Collection, Db, InsertOneWriteOpResult} from 'mongodb';
import {IEthereumContractModel, IEthereumProviderModel} from '../models/ethereum';
import config from '../utils/config';
import * as db from '../utils/db';

const database: string = config.db.ethereum.database;

// tslint:disable-next-line:variable-name
export const _getCollection = async (collection: string): Promise<Collection> => {
  return await db.getDb(database).then((client: Db) => client.collection(collection));
 };

export async function getProviderByAlias(alias: string): Promise<IEthereumProviderModel | null> {

  const coll = await _getCollection(config.db.ethereum.collections.providers);

  return coll.findOne({
      alias,
    });

}

export async function createProvider(provider: IEthereumProviderModel): Promise<boolean> {

  const coll = await _getCollection(config.db.ethereum.collections.providers);

  const result: InsertOneWriteOpResult = await coll.insertOne(provider);

  if (result.insertedCount > 0) {
    return true;
  }
  return false;
}

export async function getContractByAddress(address: string): Promise<IEthereumContractModel | null> {

  const coll = await _getCollection(config.db.ethereum.collections.contracts);

  return coll
    .findOne({
      address,
    });

}
