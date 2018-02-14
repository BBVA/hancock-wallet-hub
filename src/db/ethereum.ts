import { NextFunction, Request, Response, Router } from 'express';
import { Collection, Db } from 'mongodb';
import { IEthereumContractModel, IEthereumProviderModel } from '../models/ethereum';
import config from '../utils/config';
import * as db from '../utils/db';

const database: string = config.db.eth.database;

async function getCollection(collection: string): Promise<Collection> {
  return await db.getDb(database).then((client: Db) => client.collection(collection));
}

export async function getProviderByAlias(alias: string): Promise<IEthereumProviderModel | null> {

  const coll = await getCollection(config.db.eth.collections.providers);

  return coll
    .findOne({
      alias,
    });

}

export async function getContractByAddress(address: string): Promise<IEthereumContractModel | null> {

  const coll = await getCollection(config.db.eth.collections.contracts);

  return coll
    .findOne({
      address,
    });

}
