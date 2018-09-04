import * as db from '../../db/ethereum';
import { IEthereumProviderModel } from '../../models/ethereum';
import { SIGNERS } from '../../types';
import { error } from '../../utils/error';
import logger from '../../utils/logger';
import { CryptvaultSigner } from './cryptvaultSigner';
import { hancockCantFetchProviderError, hancockProviderNotFoundError, ISigner } from './model';
import { Signer } from './signer';

export async function getSigner(provider: string, requestId: string = ''): Promise<ISigner> {

  let providerModel: IEthereumProviderModel | null = null;

  try {

    providerModel = await db.getProviderByAlias(provider);

  } catch (e) {

    throw error(hancockCantFetchProviderError, e);

  }

  logger.info(`Provider: ${JSON.stringify(providerModel)}`);

  if (providerModel !== null) {

    let signer: ISigner;

    switch (providerModel.className) {

      case SIGNERS.CryptvaultSigner:
        signer = new CryptvaultSigner(providerModel.endpoint);
        break;

      case SIGNERS.Signer:
      default:
        signer = new Signer(providerModel.endpoint, requestId);

    }

    return Promise.resolve(signer);

  } else {

    throw error(hancockProviderNotFoundError);

  }
}
