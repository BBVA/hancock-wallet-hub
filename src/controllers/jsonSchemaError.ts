import { NextFunction, Request, Response } from 'express';
import { hancockBadRequestError } from '../models/error';
import { error } from '../utils/error';

export function jsonSchemaError(e: Error, req: Request, res: Response, next: NextFunction) {

  if (e.name === 'JsonSchemaValidation') {

    e = error(hancockBadRequestError, e);

  }

  next(e);

}
