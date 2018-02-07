import { NextFunction, Request, Response, Router } from 'express';
import * as http from 'http';
import * as url from 'url';
import * as domain from '../domain/eth';
import {
  IApiSendSignedTxRequest,
  IApiSendSignedTxResponse,
  IApiSignTxRequest,
  IApiSignTxResponse,
  IEthereumContractModel,
} from '../models/eth';

export function SingTxController(req: Request, res: Response, next: NextFunction) {

  const body: IApiSignTxRequest = req.body;

  domain
    .singTx(body.rawTx, body.provider)
    .then((response: IApiSignTxResponse) => res.send(response))
    .catch(next);

}

export function SendSignedTxController(req: Request, res: Response, next: NextFunction) {

  const body: IApiSendSignedTxRequest = req.body;

  domain
    .sendSignedTx(body.tx)
    .then((response: IApiSendSignedTxResponse) => res.send(response))
    .catch(next);

}
