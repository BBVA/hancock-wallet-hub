import 'jest';
import logger from '../../utils/logger';
import * as errors from '../error';
import { hancockDefaultError, HancockError, IHancockErrorResponse } from './../../models/error';

jest.mock('../../utils/config');
jest.mock('../../utils/logger');

describe('errorController', async () => {

  global.console = {
    error: jest.fn(),
    log: jest.fn(),
  } as any;

  let req: any;
  let res: any;
  let next: any;
  let _getResponseMock: jest.Mock;
  const mockerErrorResponse: IHancockErrorResponse = {} as any;

  beforeEach(() => {

    req = {};

    res = {
      json: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    next = jest.fn();

    _getResponseMock = jest.spyOn(errors, '_getErrorResponse').mockReturnValue(mockerErrorResponse);

    jest.clearAllMocks();

  });

  it('should return the correct status code and error body given an specific error', async () => {

    const error: HancockError = new HancockError('1111', 500, 'Custom error');
    await errors.errorController(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(error.httpCode);
    expect(_getResponseMock).toHaveBeenCalledWith(error);
    expect(res.json).toHaveBeenCalledWith(mockerErrorResponse);
    expect(logger.error).toHaveBeenCalledWith(error);

  });

  it('should return the default status code and error body when the given error is not matched', async () => {

    const error: Error = new Error('WHATEVER');
    await errors.errorController(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(hancockDefaultError.httpCode);
    expect(_getResponseMock).toHaveBeenCalledWith(hancockDefaultError);
    expect(res.json).toHaveBeenCalledWith(mockerErrorResponse);
    expect(logger.error).toHaveBeenCalledWith(hancockDefaultError);

  });

});
