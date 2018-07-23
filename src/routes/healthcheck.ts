import { Router } from 'express';
import { HealthCheckController } from '../controllers/healthcheck';

export const healthCheckRouter = Router();

healthCheckRouter
  .get('/', HealthCheckController);
