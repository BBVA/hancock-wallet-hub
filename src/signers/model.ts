import { HancockError } from '../models/error';
import {
  IApiSignTxResponse,
  IEthereumRawTransaction,
} from '../models/ethereum';

export interface ISigner {
  signTx(rawTx: IEthereumRawTransaction): Promise<IApiSignTxResponse>;
}

export const hancockCantFetchProviderError = new HancockError('50002', 500, 'Can not fetch SignProvider');
export const hancockProviderNotFoundError = new HancockError('50003', 500, 'SignProvider not found');
export const hancockSignTxProviderError = new HancockError('50004', 500, 'Error sending the raw transaction to the SignProvider');
export const hancockSignTxProviderResponseError = new HancockError('50004', 500, 'Error signing the raw transaction by the SignProvider');
export const hancockGetProviderTokenError = new HancockError('50006', 500, 'Error creating api token of SignProvider');
export const hancockGetProviderPkError = new HancockError('50007', 500, 'Error retrieving Pk from SignProvider');
export const hancockCypherProviderMessagePayloadError = new HancockError('50008', 500, 'Error cyphering SignProvider message payload');
