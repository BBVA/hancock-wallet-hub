import { Router } from 'express';
import config from '../utils/config';

import { ErrorController } from '../controllers/error';
import { FallbackController } from '../controllers/fallback';
import { HealthCheckController } from '../controllers/healthcheck';

export const appRouter = Router();

Object.keys(config.blockchain).forEach((dlt: string) => {

  const router: any = require(`./${dlt}`).Router;

  if (router) {

    appRouter.use(`/${dlt}`, router);

  }

});

appRouter
  .use('/health', HealthCheckController)
  .use(FallbackController)
  .use(ErrorController);
