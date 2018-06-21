import {NextFunction, Request, Response, Router} from 'express';
import * as domain from '../domain/ethereum';
import {
  IApiSendSignedTxRequest,
  IApiSendSignedTxResponse,
  IApiSendTxRequest,
  IApiSendTxResponse,
  IApiSignTxRequest,
  IApiSignTxResponse,
} from '../models/ethereum';
import {ISigner} from "../signers/iSigner";

export async function SignTxController(req: Request, res: Response, next: NextFunction) {
  const body: IApiSignTxRequest = req.body;

  console.log(JSON.stringify(body));

  await domain
    .signTx(body.rawTx, body.provider)
    .then((response: IApiSignTxResponse) => res.send(response))
    .catch(next);

}

export function SendTxController(req: Request, res: Response, next: NextFunction) {
  const body: IApiSendTxRequest = req.body;

  domain
    .sendTx(body.tx)
    .then((response: IApiSendTxResponse) => res.send(response))
    .catch(next);

}

export function SendSignedTxController(req: Request, res: Response, next: NextFunction) {
  const body: IApiSendSignedTxRequest = req.body;

  console.log(`Request to send-signed-tx`);
  domain
    .sendSignedTx(body.tx)
    .then((response: IApiSendSignedTxResponse) => res.send(response))
    .catch(next);

}
