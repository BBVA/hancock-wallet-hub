
import {
  IApiSendSignedTxResponse,
  IApiSendTxResponse,
  IApiSignTxResponse,
  IEthereumRawTransaction,
  IEthTransactionReceiptBody,
} from '../models/ethereum';
import { ISigner } from '../signers/model';

import { getSigner } from '../signers/signerFactory';
import { getWeb3 } from '../utils/ethereum';

export async function signTx(rawTx: IEthereumRawTransaction, provider: string): Promise<IApiSignTxResponse> {

  const signer: ISigner = await getSigner(provider);
  return signer.signTx(rawTx);

}

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

  console.log(`Connecting to DLT`);
  const web3 = await getWeb3();
  console.log(`Initialized web3`);

  return new Promise<IApiSendSignedTxResponse>((resolve, reject) => {

    web3.eth
      .sendSignedTransaction(tx)
      .on('error', (err: string) => {
        console.error(`On error: ${err}`);
        reject(new Error('DLT_ERROR'));
      })
      .then((txReceipt: IEthTransactionReceiptBody) => {
        console.log(`tx has been sent in the DLT => ${txReceipt.transactionHash}`);
        resolve({ success: true, txReceipt });

      })
      .catch((err: string) => {
        console.error(`Catch error: ${err}`);
        reject(new Error('DLT_ERROR'));
      });

  });

}

// tslint:disable-next-line:variable-name
export const _getSenderFromRawTx = (rawTx: IEthereumRawTransaction): string => {
  return rawTx.from;

};

// tslint:disable-next-line:variable-name
export const _getReceiverFromRawTx = (rawTx: IEthereumRawTransaction): string => {
  return rawTx.to;

};
