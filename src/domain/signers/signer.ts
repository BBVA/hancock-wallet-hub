import * as request from 'request-promise-native';
import {
  IApiSignTxProviderRequest,
  IApiSignTxProviderResponse,
  IApiSignTxResponse,
  IEthereumRawTransaction,
} from '../../models/ethereum';
import config from '../../utils/config';
import { error } from '../../utils/error';
import { hancockSignTxProviderError, ISigner } from './model';

const hancockHeaderRequest = config.headers.hancockRequest;

export class Signer implements ISigner {

  constructor(protected endpoint: string) {
  }

  public async signTx(rawTx: IEthereumRawTransaction, requestId: string): Promise<IApiSignTxResponse> {

    const sender: string = this.getSenderFromRawTx(rawTx);

    const body: IApiSignTxProviderRequest = {
      // tslint:disable-next-line:max-line-length
      callback: `${config.server.protocol}://${config.server.host}:${config.server.externalPort}${config.server.externalBase}/ethereum${config.api.sendSignedTxResource}`,
      rawTx,
      sender,
    };

    const headers = {[hancockHeaderRequest]: requestId};

    try {

      const response: IApiSignTxProviderResponse = await request.post(
        this.endpoint,
        {
          body,
          json: true,
          headers,
        },
      );

      return response;

    } catch (e) {

      throw error(hancockSignTxProviderError, e);

    }

  }

  protected getSenderFromRawTx(rawTx: IEthereumRawTransaction): string {

    return rawTx.from;

  }

  protected getReceiverFromRawTx(rawTx: IEthereumRawTransaction): string {

    return rawTx.to;

  }
}
