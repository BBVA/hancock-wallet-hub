import { HancockError } from '../models/error';

export const hancockCantRetrieveSignerError = new HancockError('50009', 500, 'Error retrieving the signer');
export const hancockSignTransactionError = new HancockError('50010', 500, 'Error signing the transaction');
export const hancockEthereumConnectionError = new HancockError('50011', 500, 'Error connecting with ethereum node');
export const hancockEthereumSendTransactionError = new HancockError('50012', 500, 'Error sending an ethereum transaction');
export const hancockEthereumSendSignedTransactionError = new HancockError('50013', 500, 'Error sending an ethereum signed transaction');
