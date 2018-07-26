import { NextFunction, Request, Response } from 'express';

export interface IHancockError extends Error {
  internalCode: string;
  httpCode: number;
  message: string;
  extendedMessage: string;
  errorStack: HancockError[];
}

export class HancockError extends Error implements IHancockError {

  public name: string = 'HancockError';
  public errorStack: HancockError[] = [];
  private prefix: string = 'HKWH';

  constructor(
    public internalCode: string,
    public httpCode: number,
    public message: string,
    public extendedError?: HancockError | Error) {

    super(message);
    this.internalCode = `${this.prefix}${internalCode}`;

  }

  get extendedMessage() {
    return this.extendedError ? this.extendedError.message : '';
  }

}

export function error(hancockError: HancockError, originalError?: HancockError | Error): HancockError {

  let retError: HancockError = hancockError;

  if (originalError instanceof HancockError) {

    retError = originalError;
    retError.errorStack.push(hancockError);

  } else {

    retError.extendedError = originalError;

  }

  return retError;

}

export const hancockDefaultError = new HancockError('5000', 500, 'Internal error');
export const hancockDbError = new HancockError('5001', 500, 'Error fetching from database');
export const hancockBadRequestError = new HancockError('4000', 400, 'Bad request');
export const hancockDltError = new HancockError('5030', 503, 'Service Unavailable');
export const hancockNotFoundError = new HancockError('4040', 404, 'Not Found');
export const hancockProviderError = new HancockError('5030', 503, 'Service Unavailable');

export function errorController(err: Error, req: Request, res: Response, next: NextFunction) {

  const customError: HancockError = err instanceof HancockError ? err : hancockDefaultError;

  console.log('------------------------------- ERROR -------------------------------');
  console.error(customError.message, customError.extendedMessage);
  customError.errorStack.forEach((e: HancockError, index: number) => {
    const tabs: string = new Array(index + 1).join('--');
    console.error(`${tabs} from: ${e.message} ${e.extendedMessage}`);
  });
  console.log('---------------------------------------------------------------------');

  return res
    .status(customError.httpCode)
    .json(customError);

}
