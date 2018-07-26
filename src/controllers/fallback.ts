import { NextFunction, Request, Response } from 'express';
import { errorController, hancockNotFoundError } from './error';

export function fallbackController(req: Request, res: Response, next: NextFunction) {

  return errorController(hancockNotFoundError, req, res, next);

}
