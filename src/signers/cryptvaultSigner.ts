import * as jwt from 'jsonwebtoken';
import * as request from 'request-promise-native';
import { v4 as uuidv4 } from 'uuid';
import { ISymmetricEncData, symmetricKey } from '../models/crypto';
import {
  ICryptoVaultDataToSign,
  ICryptoVaultSignResponse,
  ICryptoVaultWalletResponse,
} from '../models/cryptvault';
import {
  IApiSignTxResponse,
} from '../models/ethereum';
import { IRawTransaction } from '../models/general';
import config from '../utils/config';
import { CryptoUtils } from '../utils/crypto';
import { Signer } from './signer';

export class CryptvaultSigner extends Signer {

  private requestId: string = uuidv4();

  public async signTx(rawTx: IRawTransaction): Promise<IApiSignTxResponse> {
    const token: string = this.getToken();

    const walletEndpoint: string = config.cryptvault.api.getByAddressEndpoint.replace(':address', rawTx.from);

    const walletResponse: ICryptoVaultWalletResponse = await request.get(walletEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    });

    console.log('Wallet response: ' + JSON.stringify(walletResponse));

    if (walletResponse.result && walletResponse.result.status_code === 200) {
      const data: ICryptoVaultDataToSign = {
        back_url: config.api.signedTxHookResource,
        item_id: walletResponse.data.item_id,
        raw_tx: rawTx,
      };

      const itemKey: symmetricKey = CryptoUtils.generateSymmetricKey(32);
      const iv: symmetricKey = CryptoUtils.generateSymmetricKey(12);
      const aad: string = 'signTransaction';

      const itemJson: ISymmetricEncData = CryptoUtils.aesGCMEncrypt(JSON.stringify(data), iv, aad, itemKey);
      const itemEncKey: any = CryptoUtils.encryptRSA(walletResponse.data.public_key, itemKey);

      const signEndpoint: string = config.cryptvault.api.signEndpoint.replace(':address', rawTx.from);

      const signResponse: ICryptoVaultSignResponse = await request.post(signEndpoint, {
        body: {
          item_enc_key: itemEncKey,
          item_json: itemJson,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      });

      console.log('Sign response: ' + JSON.stringify(signResponse));

      if (signResponse.result && signResponse.result.status_code === 202) {

        return { success: true };

      } else {
        throw new Error('error signing transaction');
      }

    } else {
      throw new Error('error recovering wallet');
    }
  }

  private getToken() {
    return jwt.sign({ iss: config.cryptvault.credentials.key, txid: this.requestId },
       config.cryptvault.credentials.secret, { expiresIn: config.cryptvault.credentials.expires_in });
  }
}
