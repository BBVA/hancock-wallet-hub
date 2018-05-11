import {ISigner} from '../signers/iSigner';
import {CryptvaultSigner} from '../signers/cryptvaultSigner';
import {Signer} from "../signers/signer";
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
import { getWeb3 } from '../utils/web3';
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

// export async function signTx(rawTx: IEthereumRawTransaction, provider: string): Promise<IApiSignTxResponse> {
//
//   const providerModel: IEthereumProviderModel | null = await db.getProviderByAlias(provider);
//   const sender: string = getSenderFromRawTx(rawTx);
//
//   if (!sender || !providerModel) {
//     throw new Error('DEFAULT_ERROR');
//   }
//
//   const body: IApiSignTxProviderRequest = {
//     // tslint:disable-next-line:max-line-length
//     callback: `${config.server.protocol}://${config.server.host}:${config.server.externalPort}${config.server.externalBase}/ethereum${config.api.sendSignedTxResource}`,
//     rawTx,
//     sender,
//   };
//
//   console.log(providerModel.endpoint);
//   return request
//     .post(providerModel.endpoint,
//       {
//         body,
//         json: true,
//       })
//     .then((response: IApiSignTxProviderResponse) => response)
//     .catch((error: string) => { throw new Error('PROVIDER_ERROR'); });
//
// }

export async function sendTx(rawTx: string): Promise<IApiSendTxResponse> {

  if (!rawTx) {
    throw new Error('DEFAULT_ERROR');
  }

  const web3 = await getWeb3();

  return new Promise<IApiSendTxResponse>((resolve, reject) => {

    web3.eth
      .sendTransaction(rawTx)
      .on('error', (err: string) => reject(new Error('DLT_ERROR')))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        console.log(`tx has been written in the DLT => ${txReceipt.transactionHash}`);
        resolve({ success: true, txReceipt });

      })
      .catch((err: string) => reject(new Error('DLT_ERROR')));

  });

}

export async function sendSignedTx(tx: string): Promise<IApiSendSignedTxResponse> {

  if (!tx) {
    throw new Error('DEFAULT_ERROR');
  }

  const web3 = await getWeb3();

  return new Promise<IApiSendSignedTxResponse>((resolve, reject) => {

    const promise = web3.eth
      .sendSignedTransaction(tx)
      .on('error', (err: string) => reject(new Error('DLT_ERROR')))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        console.log(`tx has been sent in the DLT => ${txReceipt.transactionHash}`);
        resolve({ success: true, txReceipt });

      })
      .catch((err: string) => reject(new Error('DLT_ERROR')));

  });

}

function getSenderFromRawTx(rawTx: IEthereumRawTransaction): string {

  return rawTx.from;

}

function getReceiverFromRawTx(rawTx: IEthereumRawTransaction): string {

  return rawTx.to;

}
