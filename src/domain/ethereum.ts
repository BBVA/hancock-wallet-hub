import * as request from 'request-promise-native';
import * as ethDb from '../db/ethereum';
import {
  IApiSendSignedTxResponse,
  IApiSignTxProviderRequest,
  IApiSignTxProviderResponse,
  IApiSignTxResponse,
  IEthereumContractModel,
  IEthereumProviderModel,
  IEthereumRawTransaction,
  IEthTransactionReceiptBody,
} from '../models/ethereum';
import config from '../utils/config';

// tslint:disable-next-line:no-var-requires
const Web3 = require('web3');

export async function signTx(rawTx: IEthereumRawTransaction, provider: string): Promise<IApiSignTxResponse> {

  const providerModel: IEthereumProviderModel | null = await ethDb.getProviderByAlias(provider);
  const sender: string = getSenderFromRawTx(rawTx);

  if (!sender || !providerModel) {
    throw new Error('DEFAULT_ERROR');
  }

  const body: IApiSignTxProviderRequest = {
    // tslint:disable-next-line:max-line-length
    callback: `${config.server.host}:${config.server.port}${config.server.base}/ethereum${config.api.sendSignedTxResource}`,
    rawTx,
    sender,
  };

  return request
    .post(providerModel.endpoint,
    {
      body,
      json: true,
    })
    .then((response: IApiSignTxProviderResponse) => response)
    .catch((error: string) => { throw new Error('PROVIDER_ERROR'); });

}

export async function sendSignedTx(rawTx: string): Promise<IApiSendSignedTxResponse> {

  if (!rawTx) {
    throw new Error('DEFAULT_ERROR');
  }

  const cfg: any = config.blockchain.eth;
  const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${cfg.host}:${cfg.port}`));

  return web3.eth
    .sendSignedTransaction(rawTx)
    .then((txReceipt: IEthTransactionReceiptBody) => {

      console.log(`tx has been written in the DLT => ${txReceipt.transactionHash}`);
      return { success: true };

    })
    .catch((error: string) => { throw new Error('DLT_ERROR'); });

}

function getSenderFromRawTx(rawTx: IEthereumRawTransaction): string {

  return rawTx.from;

}
