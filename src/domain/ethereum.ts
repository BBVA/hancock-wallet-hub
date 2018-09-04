import * as request from 'request-promise-native';
import {
  IApiSendSignedTxRequest,
  IApiSendSignedTxResponse,
  IApiSendTxResponse,
  IApiSignTxRequest,
  IApiSignTxResponse,
  IEthereumRawTransaction,
  IEthTransactionReceiptBody,
} from '../models/ethereum';
import { error } from '../utils/error';
import { getWeb3 } from '../utils/ethereum';
import logger from '../utils/logger';
import {
  hancockCallBackTxError,
  hancockCantRetrieveSignerError,
  hancockEthereumConnectionError,
  hancockEthereumSendSignedTransactionError,
  hancockEthereumSendTransactionError,
  hancockSignTransactionError,
} from './model';
import { ISigner } from './signers/model';
import { getSigner } from './signers/signerFactory';

const pendingRequest = new Map();

export async function signTx(body: IApiSignTxRequest): Promise<IApiSignTxResponse> {

  let signer: ISigner;

  try {

    if (body.backUrl && body.requestId) {

      pendingRequest.set(body.requestId, body.backUrl);
      signer = await getSigner(body.provider, body.requestId as string);

    } else {

      signer = await getSigner(body.provider);

    }

  } catch (e) {

    throw error(hancockCantRetrieveSignerError, e);

  }

  try {

    return await signer.signTx(body.rawTx);

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

export async function sendSignedTx(body: IApiSendSignedTxRequest): Promise<IApiSendSignedTxResponse> {

  let web3: any;

  try {

    web3 = await getWeb3();

  } catch (e) {

    throw error(hancockEthereumConnectionError, e);

  }

  return new Promise<IApiSendSignedTxResponse>((resolve, reject) => {

    web3.eth
      .sendSignedTransaction(body.tx)
      .on('error', (e: Error) => reject(error(hancockEthereumSendSignedTransactionError, e)))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        if (body.requestId) {

          const backUrl = pendingRequest.get(body.requestId);

          if (backUrl) {

            _sendTxCallBack(txReceipt, backUrl, body.requestId as string);
            pendingRequest.delete(body.requestId);

          }

        }

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

// tslint:disable-next-line:variable-name
export const _sendTxCallBack = (tx: IEthTransactionReceiptBody, backUrl: string, requestId: string): any => {

  try {

    return request.post(
      backUrl,
      {
        body: {
          tx,
        },
        json: true,
        headers: {
          'Hancock-Request-Id': requestId,
        },
      },
    );

  } catch (e) {

    throw error(hancockCallBackTxError, e);

  }

};
