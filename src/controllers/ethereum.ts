import { NextFunction, Request, Response } from 'express';
import * as domain from '../domain/ethereum';
import {
  IApiSendSignedTxRequest,
  IApiSendSignedTxResponse,
  IApiSendTxRequest,
  IApiSendTxResponse,
  IApiSignTxRequest,
  IApiSignTxResponse,
} from '../models/ethereum';

export async function signTxController(req: Request, res: Response, next: NextFunction) {

  const body: IApiSignTxRequest = req.body;

  return domain
    .signTx(body.rawTx, body.provider)
    .then((response: IApiSignTxResponse) => res.send(response))
    .catch(next);

}

export async function sendTxController(req: Request, res: Response, next: NextFunction) {

  const body: IApiSendTxRequest = req.body;

  return domain
    .sendTx(body.tx)
    .then((response: IApiSendTxResponse) => res.send(response))
    .catch(next);

}

export async function sendSignedTxController(req: Request, res: Response, next: NextFunction) {

  const body: IApiSendSignedTxRequest = req.body;

  return domain
    .sendSignedTx(body.tx)
    .then((response: IApiSendSignedTxResponse) => res.send(response))
    .catch(next);

}
