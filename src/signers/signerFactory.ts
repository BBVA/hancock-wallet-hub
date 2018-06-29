import * as db from '../db/ethereum';
import { IEthereumProviderModel } from '../models/ethereum';
import {SIGNERS} from '../types';
import {CryptvaultSigner} from './cryptvaultSigner';
import {ISigner} from './iSigner';
import {Signer} from './signer';

export async function getSigner(provider: string): Promise<ISigner> {
  const providerModel: IEthereumProviderModel | null = await db.getProviderByAlias(provider);

  console.log(`Provider: ${JSON.stringify(providerModel)}`);

  let signer: ISigner;

  if (providerModel !== null) {
    switch (providerModel.className) {
      case SIGNERS.CryptvaultSigner:
        signer = new CryptvaultSigner(providerModel.endpoint);
        break;
      case SIGNERS.Signer:
      default:
        signer = new Signer(providerModel.endpoint);
    }
    return Promise.resolve(signer);
  } else {
    return Promise.reject('not found');
  }
}
