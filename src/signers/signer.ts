import * as request from 'request-promise-native';
import * as db from '../db/ethereum';
import {
  IApiSignTxProviderRequest,
  IApiSignTxProviderResponse,
  IApiSignTxResponse,
  IEthereumProviderModel,
  IEthereumRawTransaction,
} from '../models/ethereum';
import config from '../utils/config';
import {ISigner} from './iSigner';

export class Signer implements ISigner {

  constructor(protected endpoint: string) {
  }

  public async signTx(rawTx: IEthereumRawTransaction): Promise<IApiSignTxResponse> {
    const sender: string = this.getSenderFromRawTx(rawTx);

    if (!sender) {
      throw new Error('DEFAULT_ERROR');
    }

    const body: IApiSignTxProviderRequest = {
      // tslint:disable-next-line:max-line-length
      callback: `${config.server.protocol}://${config.server.host}:${config.server.externalPort}${config.server.externalBase}/ethereum${config.api.sendSignedTxResource}`,
      rawTx,
      sender,
    };

    return request
      .post(this.endpoint,
        {
          body,
          json: true,
        })
      .then((response: IApiSignTxProviderResponse) => response)
      .catch((error: string) => { throw new Error('PROVIDER_ERROR'); });

  }

  protected getSenderFromRawTx(rawTx: IEthereumRawTransaction): string {

    return rawTx.from;

  }

  protected getReceiverFromRawTx(rawTx: IEthereumRawTransaction): string {

    return rawTx.to;

  }
}
