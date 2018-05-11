import * as db from '../db/ethereum';
import * as request from 'request-promise-native';
import {
  // IApiSignTxProviderRequest,
  // IApiSignTxProviderResponse,
  IApiSignTxResponse,
  IEthereumProviderModel,
  IEthereumRawTransaction,
} from '../models/ethereum';
import config from '../utils/config';
import {Signer} from "./signer";

export class CryptvaultSigner extends Signer {

  public async signTx(rawTx: IEthereumRawTransaction): Promise<IApiSignTxResponse> {

    return new Promise<any>((resolve, reject) => {
      console.log("CryptvaultSigner");
      resolve({success: true});
    });
  }
}
