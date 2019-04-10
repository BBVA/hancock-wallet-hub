import * as jwt from 'jsonwebtoken';
import * as request from 'request-promise-native';
import {ISymmetricEncData, symmetricKey} from '../../models/crypto';
import {ICryptoVaultDataToSign, ICryptoVaultSignResponse, ICryptoVaultWalletResponse} from '../../models/cryptvault';
import {IApiSignTxResponse} from '../../models/ethereum';
import {IRawTransaction} from '../../models/general';
import config from '../../utils/config';
import {CryptoUtils} from '../../utils/crypto';
import {error} from '../../utils/error';
import logger from '../../utils/logger';
import {
  hancockCypherProviderMessagePayloadError,
  hancockGetProviderPkError,
  hancockGetProviderTokenError,
  hancockSignTxProviderError,
  hancockSignTxProviderResponseError,
} from './model';
import {Signer} from './signer';

export class SecureSigner extends Signer {

  public async signTx(rawTx: IRawTransaction, requestId: string): Promise<IApiSignTxResponse> {

    const token: string = this.getToken(requestId);

    const walletEndpoint: string = this.endpoint.recoverPkEndPoint.replace(':address', rawTx.from);
    let walletResponse: ICryptoVaultWalletResponse;

    try {

      walletResponse = await request.get(walletEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      });

    } catch (e) {

      throw error(hancockGetProviderPkError, e);

    }

    logger.debug('Wallet response: ' + JSON.stringify(walletResponse));

    if (walletResponse.result && walletResponse.result.status_code === 200) {

      let itemJson: ISymmetricEncData;
      let itemEncKey: any;
      let signEndpoint: string;

      try {

        const data: ICryptoVaultDataToSign = {
          back_url: config.api.signedTxHookResource,
          item_id: walletResponse.data.item_id,
          raw_tx: rawTx,
        };

        const itemKey: symmetricKey = CryptoUtils.generateSymmetricKey(32);
        const iv: symmetricKey = CryptoUtils.generateSymmetricKey(12);
        const aad: string = 'signTransaction';

        itemJson = CryptoUtils.aesGCMEncrypt(JSON.stringify(data), iv, aad, itemKey);
        itemEncKey = CryptoUtils.encryptRSA(walletResponse.data.public_key, itemKey);
        signEndpoint = this.endpoint.singEndPoint.replace(':address', rawTx.from);

      } catch (e) {

        throw error(hancockCypherProviderMessagePayloadError, e);

      }

      let signResponse: ICryptoVaultSignResponse;

      try {

        signResponse = await request.post(signEndpoint, {
          body: {
            item_enc_key: itemEncKey,
            item_json: itemJson,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          json: true,
        });

      } catch (e) {

        throw error(hancockSignTxProviderError, e);

      }

      logger.debug('Sign response: ' + JSON.stringify(signResponse));

      if (signResponse.result && signResponse.result.status_code === 202) {

        return { success: true };

      } else {

        throw error(hancockSignTxProviderResponseError);

      }

    } else {

      throw error(hancockGetProviderPkError);

    }
  }

  private getToken(requestId: string): string {

    try {

      return jwt.sign(
        { iss: config.cryptvault.credentials.key, txid: requestId },
        config.cryptvault.credentials.secret,
        { expiresIn: config.cryptvault.credentials.expires_in },
      );

    } catch (e) {

      throw error(hancockGetProviderTokenError, e);

    }

  }
}
