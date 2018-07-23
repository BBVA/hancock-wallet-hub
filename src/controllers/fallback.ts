import { NextFunction, Request, Response } from 'express';
import { ErrorController, Errors } from './error';

export function FallbackController(req: Request, res: Response, next: NextFunction) {

  return ErrorController({message: Errors.NOT_FOUND}, req, res, next);

}
