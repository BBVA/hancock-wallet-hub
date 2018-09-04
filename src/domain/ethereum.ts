import * as request from 'request-promise-native';
import { v4 as uuidv4 } from 'uuid';
import {
  IApiSendSignedTxDomainParams,
  IApiSendSignedTxResponse,
  IApiSendTxResponse,
  IApiSignTxDomainParams,
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

export async function signTx(params: IApiSignTxDomainParams): Promise<IApiSignTxResponse> {

  let signer: ISigner;

  const requestId: string = params.requestId !== undefined ? (params.requestId as string) : uuidv4();

  try {

    if (params.backUrl && params.requestId) {

      pendingRequest.set(params.requestId, params.backUrl);

    }

    signer = await getSigner(params.provider);

  } catch (e) {

    throw error(hancockCantRetrieveSignerError, e);

  }

  try {

    return await signer.signTx(params.rawTx, requestId);

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

export async function sendSignedTx(params: IApiSendSignedTxDomainParams): Promise<IApiSendSignedTxResponse> {

  let web3: any;

  try {

    web3 = await getWeb3();

  } catch (e) {

    throw error(hancockEthereumConnectionError, e);

  }

  return new Promise<IApiSendSignedTxResponse>((resolve, reject) => {

    web3.eth
      .sendSignedTransaction(params.tx)
      .on('error', (e: Error) => reject(error(hancockEthereumSendSignedTransactionError, e)))
      .then((txReceipt: IEthTransactionReceiptBody) => {

        if (params.requestId) {

          const backUrl = pendingRequest.get(params.requestId);

          if (backUrl) {

            _sendTxCallBack(txReceipt, backUrl, params.requestId as string);
            pendingRequest.delete(params.requestId);

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
