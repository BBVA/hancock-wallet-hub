import {NextFunction, Request, Response} from 'express';
import * as db from '../db/ethereum';
import {IEthereumProviderModel} from '../models/ethereum';

export async function createProvider(req: Request, res: Response, next: NextFunction) {

  const body: IEthereumProviderModel = req.body;
  const created =  await db.createProvider(body);

  res
    .status(200)
    .json({
      success: created,
    });

}
