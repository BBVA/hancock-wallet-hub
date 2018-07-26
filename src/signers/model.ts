import { HancockError } from '../controllers/error';
import {
  IApiSignTxResponse,
  IEthereumRawTransaction,
} from '../models/ethereum';

export interface ISigner {
  signTx(rawTx: IEthereumRawTransaction): Promise<IApiSignTxResponse>;
}

export const hancockCantFetchProviderError = new HancockError('5002', 500, 'Can not fetch SignProvider');
export const hancockProviderNotFoundError = new HancockError('5003', 500, 'SignProvider not found');
export const hancockSignTxProviderError = new HancockError('5004', 500, 'Error sending the raw transaction to the SignProvider');
