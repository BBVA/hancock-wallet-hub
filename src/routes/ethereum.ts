import {Router as ExpressRouter} from 'express';
import {validate} from 'express-jsonschema';
import {readFileSync} from 'fs';
import * as path from 'path';
import {sendSignedTxController, sendTxController, signTxController} from '../controllers/ethereum';
import config from '../utils/config';

export const router = ExpressRouter();
const schemaPath: string = path.normalize(__dirname + '/../../../raml/schemas/eth');
const signTxSchema = JSON.parse(readFileSync(schemaPath + '/sign-tx.json', 'utf-8'));
const sendTxSchema = JSON.parse(readFileSync(schemaPath + '/send-tx.json', 'utf-8'));
const sendSignedTxSchema = JSON.parse(readFileSync(schemaPath + '/send-signed-tx.json', 'utf-8'));

router
  .post(config.api.signTxResource, validate({ body: signTxSchema }), signTxController)
  .post(config.api.sendTxResource, validate({ body: sendTxSchema }), sendTxController)
  .post(config.api.sendSignedTxResource, validate({ body: sendSignedTxSchema }), sendSignedTxController);

