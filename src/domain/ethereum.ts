import * as request from 'request-promise-native';
import * as db from '../db/ethereum';
import {
  IApiSendSignedTxResponse,
  IApiSendTxResponse,
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

  const providerModel: IEthereumProviderModel | null = await db.getProviderByAlias(provider);
  const sender: string = getSenderFromRawTx(rawTx);

  if (!sender || !providerModel) {
    throw new Error('DEFAULT_ERROR');
  }

  const body: IApiSignTxProviderRequest = {
    // tslint:disable-next-line:max-line-length
    callback: `${config.server.protocol}://${config.server.host}:${config.server.externalPort}${config.server.externalBase}/ethereum${config.api.sendSignedTxResource}`,
    rawTx,
    sender,
  };

  console.log(providerModel.endpoint);
  return request
    .post(providerModel.endpoint,
      {
        body,
        json: true,
      })
    .then((response: IApiSignTxProviderResponse) => response)
    .catch((error: string) => { throw new Error('PROVIDER_ERROR'); });

}

export async function sendTx(rawTx: string): Promise<IApiSendTxResponse> {

  if (!rawTx) {
    throw new Error('DEFAULT_ERROR');
  }

  try {

    // TODO: Refactor web3 provider global to all the app
    const cfg: any = config.blockchain.ethereum;
    const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${cfg.host}:${cfg.port}`));

    const r = await web3.eth.net.isListening();

    return web3.eth
      .sendTransaction(rawTx)
      .then((txReceipt: IEthTransactionReceiptBody) => {

        console.log(`tx has been written in the DLT => ${txReceipt.transactionHash}`);
        return { success: true, txReceipt };

      })
      .catch((err: string) => dltError(err));

  } catch (err) {

    dltError(err);
    return Promise.reject(err);

   }

}

export async function sendSignedTx(tx: string): Promise<IApiSendSignedTxResponse> {

  if (!tx) {
    throw new Error('DEFAULT_ERROR');
  }

  try {

    const cfg: any = config.blockchain.ethereum;
    const web3 = new Web3(new Web3.providers.WebsocketProvider(`ws://${cfg.host}:${cfg.port}`));

    const r = await web3.eth.net.isListening();

    return web3.eth
      .sendSignedTransaction(tx)
      .on('error', (err: string) => {
        console.error(err);
        throw new Error('DLT_ERROR');
      })
      .then((txReceipt: IEthTransactionReceiptBody) => {

        console.log(`tx has been sent in the DLT => ${txReceipt.transactionHash}`);
        return { success: true, txReceipt };

      })
      .catch((err: string) => dltError(err));

  } catch (err) {

    dltError(err);
    return Promise.reject(err);

  }

}

function getSenderFromRawTx(rawTx: IEthereumRawTransaction): string {

  return rawTx.from;

}

function getReceiverFromRawTx(rawTx: IEthereumRawTransaction): string {

  return rawTx.to;

}

function dltError(err: any): Promise<any> {

  console.error(err);
  throw new Error('DLT_ERROR');

}
