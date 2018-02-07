import { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import { validate } from 'express-jsonschema';
import { readFileSync } from 'fs';
import * as path from 'path';
import { SendSignedTxController, SingTxController } from '../controllers/eth';
import config from '../utils/config';

export const Router = ExpressRouter();

const schemaPath: string = path.normalize(__dirname + '/../../../raml/schemas/eth');
const SingTxSchema = JSON.parse(readFileSync(schemaPath + '/sign-tx.json', 'utf-8'));
const SendSignedTxSchema = JSON.parse(readFileSync(schemaPath + '/send-signed-tx.json', 'utf-8'));

Router
  .post(config.api.signTxResource, validate({ body: SingTxSchema }), SingTxController)
  .post(config.api.sendSignedTxResource, validate({ body: SendSignedTxSchema }), SendSignedTxController);
