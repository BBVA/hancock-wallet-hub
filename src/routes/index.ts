import { Router } from 'express';
import config from '../utils/config';

import { errorController } from '../controllers/error';
import { fallbackController } from '../controllers/fallback';
import { healthCheckController } from '../controllers/healthcheck';
import { jsonSchemaError } from '../controllers/jsonSchemaError';

export const appRouter = Router();

Object.keys(config.blockchain).forEach((dlt: string) => {

  const router: any = require(`./${dlt}`).router;

  if (router) {

    appRouter.use(`/${dlt}`, router);

  }

});

appRouter
  .use('/health', healthCheckController)
  .use(fallbackController)
  .use(jsonSchemaError)
  .use(errorController);
