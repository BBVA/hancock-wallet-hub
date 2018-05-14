import {IRawTransaction} from "./general";

export interface ICryptoVaultResult {
  status_code: number;
  description: string;
  internal_code: string;
}

export interface ICryptoVaultWalletResponseData {
  public_key: string;
  item_id: string;
}

export interface ICryptoVaultWalletResponse {
  result: ICryptoVaultResult;
  data: ICryptoVaultWalletResponseData;
}

export interface ICryptoVaultDataToSign {
  item_id: string;
  raw_tx: IRawTransaction;
  back_url: string;
}

export interface ICryptoVaultSignResponse {
  result: ICryptoVaultResult;
}