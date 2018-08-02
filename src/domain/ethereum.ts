import {
  IApiSendSignedTxResponse,
  IApiSendTxResponse,
  IApiSignTxResponse,
  IEthereumRawTransaction,
  IEthTransactionReceiptBody,
} from '../models/ethereum';
import { error } from '../utils/error';
import { getWeb3 } from '../utils/ethereum';
import logger from '../utils/logger';
import {
  hancockCantRetrieveSignerError,
  hancockEthereumConnectionError,
  hancockEthereumSendSignedTransactionError,
  hancockEthereumSendTransactionError,
  hancockSignTransactionError,
} from './model';
import { ISigner } from './signers/model';
import { getSigner } from './signers/signerFactory';

export async function signTx(rawTx: IEthereumRawTransaction, provider: string): Promise<IApiSignTxResponse> {

  let signer: ISigner;

  try {

    signer = await getSigner(provider);

  } catch (e) {

    throw error(hancockCantRetrieveSignerError, e);

  }

  try {

    return await signer.signTx(rawTx);

  } catch (e) {

    throw error(hancockSignTransactionError, e);

  }
}

export async function sendTx(rawTx: string): Promise<IApiSendTxResponse> {

  let web3: any;

  try {

    web3 = await getWeb3();

  } catch (e) {

    throw error(hancockEthereumConnectionError, e);

  }

  return new Promise<IApiSendTxResponse>((resolve, reject) => {

    web3.eth
      .sendTransaction(rawTx)
      .on('error', (e: Error) => reject(error(hancockEthereumSendTransactionError, e)))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        logger.info(`tx has been written in the DLT => ${txReceipt.transactionHash}`);
        resolve({ success: true, txReceipt });

      })
      .catch((e: Error) => reject(error(hancockEthereumSendTransactionError, e)));

  });

}

export async function sendSignedTx(tx: string): Promise<IApiSendSignedTxResponse> {

  let web3: any;

  try {

    web3 = await getWeb3();

  } catch (e) {

    throw error(hancockEthereumConnectionError, e);

  }

  return new Promise<IApiSendSignedTxResponse>((resolve, reject) => {

    web3.eth
      .sendSignedTransaction(tx)
      .on('error', (e: Error) => reject(error(hancockEthereumSendSignedTransactionError, e)))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        logger.info(`tx has been sent in the DLT => ${txReceipt.transactionHash}`);
        resolve({ success: true, txReceipt });

      })
      .catch((e: Error) => reject(error(hancockEthereumSendSignedTransactionError, e)));

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
