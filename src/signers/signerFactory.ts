import {ISigner} from './iSigner';
import {CryptvaultSigner} from './cryptvaultSigner';
import {Signer} from "./signer";
import * as db from '../db/ethereum';
import {
  IEthereumProviderModel,
} from '../models/ethereum';
import {SIGNERS} from "../types";

export async function getSigner(provider: string): Promise<ISigner> {
  const providerModel: IEthereumProviderModel | null = await db.getProviderByAlias(provider);

  console.log(`Provider: ${JSON.stringify(providerModel)}`);

  let signer: ISigner;

  if(providerModel !== null) {
    switch (providerModel.className) {
      case SIGNERS.CryptvaultSigner:
        signer = new CryptvaultSigner();
        break;
      case SIGNERS.Signer:
      default:
        signer = new Signer(providerModel.endpoint);
    }
    return Promise.resolve(signer);
  } else {
    return Promise.reject("not found");
  }

}