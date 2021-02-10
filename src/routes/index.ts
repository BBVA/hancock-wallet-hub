import {Router} from 'express';
import config from '../utils/config';

import {validate} from 'express-jsonschema';
import {readFileSync} from 'fs';
import * as path from 'path';
import {errorController} from '../controllers/error';
import {fallbackController} from '../controllers/fallback';
import {healthCheckController} from '../controllers/healthcheck';
import {jsonSchemaError} from '../controllers/jsonSchemaError';

import {createProvider} from '../controllers/provider';

export const appRouter = Router();

Object.keys(config.blockchain).forEach((dlt: string) => {

  const router: any = require(`./${dlt}`).router;

  if (router) {

    appRouter.use(`/${dlt}`, router);

  }

});

// Register providers endpoint

const schemaPath: string = path.normalize(__dirname + '/../../../raml/schemas');
const providerSchema = JSON.parse(readFileSync(schemaPath + '/provider.json', 'utf-8'));
appRouter
  .post(config.api.providersResource, validate({ body: providerSchema }), createProvider);

appRouter
  .use('/health', healthCheckController)
  .use(fallbackController)
  .use(jsonSchemaError)
  .use(errorController);
