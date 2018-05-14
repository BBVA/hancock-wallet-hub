import * as jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import * as request from 'request-promise-native';
import {
  IApiSignTxResponse,
} from '../models/ethereum';
import config from '../utils/config';
import {Signer} from "./signer";
import {
  ICryptoVaultDataToSign,
  ICryptoVaultSignResponse,
  ICryptoVaultWalletResponse,
} from "../models/cryptvault";
import {CryptoUtils} from "../utils/crypto";
import {ISymmetricEncData, symmetricKey} from "../models/crypto";
import {IRawTransaction} from "../models/general";

export class CryptvaultSigner extends Signer {

  private request_id: string = uuidv4();

  public async signTx(rawTx: IRawTransaction): Promise<IApiSignTxResponse> {
    let token: string = this.getToken();

    let walletEndpoint: string = config.cryptvault.api.getByAddressEndpoint.replace(":address", rawTx.from);

    let walletResponse: ICryptoVaultWalletResponse = await request.get(walletEndpoint, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      json: true,
    });

    console.log("Wallet response: " + JSON.stringify(walletResponse));

    if (walletResponse.result && walletResponse.result.status_code === 200) {
      let data: ICryptoVaultDataToSign = {
        item_id: walletResponse.data.item_id,
        raw_tx: rawTx,
        back_url: config.api.signedTxHookResource,
      };

      let item_key: symmetricKey = CryptoUtils.generateSymmetricKey(32);
      let iv: symmetricKey = CryptoUtils.generateSymmetricKey(12);
      let aad: string = "signTransaction";

      let item_json: ISymmetricEncData = CryptoUtils.aesGCMEncrypt(JSON.stringify(data), iv, aad, item_key);
      let item_enc_key: any = CryptoUtils.encryptRSA(walletResponse.data.public_key, item_key);

      let signEndpoint: string = config.cryptvault.api.signEndpoint.replace(":address", rawTx.from);

      let signResponse: ICryptoVaultSignResponse = await request.post(signEndpoint, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: {
          item_json: item_json,
          item_enc_key: item_enc_key
        },
        json: true,
      });

      console.log("Sign response: " + JSON.stringify(signResponse));

      if (signResponse.result && signResponse.result.status_code === 202) {

        return {success: true};

      } else {
        throw new Error('error signing transaction')
      }

    } else {
      throw new Error('error recovering wallet')
    }
  }

  private getToken() {
    return jwt.sign({ iss: config.cryptvault.credentials.key, txid: this.request_id }, config.cryptvault.credentials.secret, { expiresIn: config.cryptvault.credentials.expires_in })
  }
}
