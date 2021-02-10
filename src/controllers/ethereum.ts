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
import config from '../utils/config';

const hancockHeaderRequest = config.headers.hancockRequest;

export async function signTxController(req: Request, res: Response, next: NextFunction) {

  const signTxParams: IApiSignTxDomainParams = {
    ...req.body,
    requestId : req.headers[hancockHeaderRequest],
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
    requestId: req.headers[hancockHeaderRequest],
  };

  const asyncCall: boolean = (req.body.async === null || req.body.async === undefined || req.body.async);

  return domain
    .sendSignedTx(sendSignedTxParams, asyncCall)
    .then((response: IApiSendSignedTxResponse) => res.send(response))
    .catch(next);

}
