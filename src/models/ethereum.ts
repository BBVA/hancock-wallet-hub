import {PROTOCOLS} from '../types';
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
  providerName: string;
  protocol: PROTOCOLS;
  singEndPoint: string;
  jwt: string;
  recoverPkEndPoint: string;
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
  transactionHash: string;
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

// CallBackResponses

export interface ISendHashCallbackBody {
  kind: string;
  transactionHash: ethTxHash;
}

export interface ISendReceiptCallbackBody {
  kind: string;
  txReceipt: IEthTransactionReceiptBody;
}

// Provider model

export interface IApiProviderResponse {
  success: boolean;
}
