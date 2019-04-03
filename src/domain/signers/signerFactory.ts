import * as db from '../../db/ethereum';
import { IEthereumProviderModel } from '../../models/ethereum';
import { SIGNERS } from '../../types';
import { error } from '../../utils/error';
import logger from '../../utils/logger';
import { SecureSigner } from './secureSigner';
import { hancockCantFetchProviderError, hancockProviderNotFoundError, ISigner } from './model';
import { Signer } from './signer';

export async function getSigner(provider: string): Promise<ISigner> {

  let providerModel: IEthereumProviderModel | null = null;

  try {

    providerModel = await db.getProviderByAlias(provider);

  } catch (e) {

    throw error(hancockCantFetchProviderError, e);

  }

  logger.info(`Provider: ${JSON.stringify(providerModel)}`);

  if (providerModel !== null) {

    let signer: ISigner;

    switch (providerModel.protocol) {

      case SIGNERS.SecureSigner:
        signer = new SecureSigner(providerModel);
        break;

      case SIGNERS.Signer:
      default:
        signer = new Signer(providerModel);

    }

    return Promise.resolve(signer);

  } else {

    throw error(hancockProviderNotFoundError);

  }
}
