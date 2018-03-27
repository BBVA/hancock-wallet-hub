export type ethAddress = string;
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
  endpoint: string;
}

export interface IEthereumRawTransaction {
  from: ethAddress;
  nonce: string;
  gasPrice: string;
  gasLimit: string;
  to: ethAddress;
  value: string;
  data: string;
  chainId?: number;
}

// SignTx Models

export interface IApiSignTxRequest {
  provider: string;
  rawTx: IEthereumRawTransaction;
}

export interface IApiSignTxProviderRequest {
  rawTx: IEthereumRawTransaction;
  sender: ethAddress;
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
  tx: string;
}

export interface IApiSendTxResponse {
  success: boolean;
  txReceipt: IEthTransactionReceiptBody;
}

// SendSignedTx Models

export interface IApiSendSignedTxRequest {
  tx: string;
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
