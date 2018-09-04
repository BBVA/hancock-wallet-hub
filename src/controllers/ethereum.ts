import { NextFunction, Request, Response } from 'express';
import * as domain from '../domain/ethereum';
import {
  IApiSendSignedTxDomainParams,
  IApiSendSignedTxResponse,
  IApiSendTxRequest,
  IApiSendTxResponse,
  IApiSignTxDomainParams,
  IApiSignTxResponse,
} from '../models/ethereum';

export async function signTxController(req: Request, res: Response, next: NextFunction) {

  const signTxParams: IApiSignTxDomainParams = {
    ...req.body,
    requestId : req.headers['vnd-hancock-request-id'],
  };

  return domain
    .signTx(signTxParams)
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

  const sendSignedTxParams: IApiSendSignedTxDomainParams = {
    ...req.body,
    requestId: req.headers['vnd-hancock-request-id'],
  };

  return domain
    .sendSignedTx(sendSignedTxParams)
    .then((response: IApiSendSignedTxResponse) => res.send(response))
    .catch(next);

}
