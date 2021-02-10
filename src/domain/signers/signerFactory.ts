import * as db from '../../db/ethereum';
import {IEthereumProviderModel} from '../../models/ethereum';
import {PROTOCOLS} from '../../types';
import {error} from '../../utils/error';
import logger from '../../utils/logger';
import {hancockCantFetchProviderError, hancockProviderNotFoundError, ISigner} from './model';
import {SecureSigner} from './secureSigner';

import {Signer} from './signer';

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

      case PROTOCOLS.SECURE:
        signer = new SecureSigner(providerModel);
        break;

      case PROTOCOLS.SINGLE:
      default:
        signer = new Signer(providerModel);

    }

    return Promise.resolve(signer);

  } else {

    throw error(hancockProviderNotFoundError);

  }
}
