import {
  IApiSignTxResponse,
  IEthereumRawTransaction,
} from '../models/ethereum';

export interface ISigner {
  signTx(rawTx: IEthereumRawTransaction): Promise<IApiSignTxResponse>;
}
