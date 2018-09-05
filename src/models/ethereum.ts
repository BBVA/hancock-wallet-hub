import {dltAddress, IRawTransaction} from './general';

export type ethContractAddress = string;
export type ethTxHash = string;
export type ethBlockHash = string;
export type ethData = string;
export type ethTopic = string;

export interface IEthereumContractModel {
  alias: string;
  address: string;
  abi: any[];
}

export interface IEthereumProviderModel {
  alias: string;
  className: string;
  endpoint: string;
}

export interface IEthereumRawTransaction extends IRawTransaction {
  from: dltAddress;
  nonce: string;
  gasPrice: string;
  gasLimit: string;
  to: dltAddress;
  value: string;
  data: string;
  chainId?: number;
}

// SignTx Models

export interface IApiSignTxDomainParams {
  provider: string;
  rawTx: IEthereumRawTransaction;
  backUrl?: string;
  requestId?: string | string[] | undefined;
}

export interface IApiSignTxProviderRequest {
  rawTx: IEthereumRawTransaction;
  sender: dltAddress;
  callback: string;
}

export interface IApiSignTxProviderResponse {
  success: boolean;
}

export interface IApiSignTxResponse {
  success: boolean;
}

// SendTx Models

export interface IApiSendTxRequest {
  tx: IEthereumRawTransaction;
}

export interface IApiSendTxResponse {
  success: boolean;
  txReceipt: IEthTransactionReceiptBody;
}

// SendSignedTx Models

export interface IApiSendSignedTxDomainParams {
  tx: string;
  requestId?: string | string[] | undefined;
}

export interface IApiSendSignedTxResponse {
  success: boolean;
  txReceipt: IEthTransactionReceiptBody;
}

// DLT

export interface IEthTransactionReceiptBody {
  transactionHash: ethTxHash;
  transactionIndex: number;
  blockHash: ethBlockHash;
  blockNumber: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  contractAddress: ethContractAddress;
  logs: string[];
  status: string;
  logsBloom: string;
}
