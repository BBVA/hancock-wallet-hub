import 'jest';
import { errorController, hancockNotFoundError } from '../error';
import { fallbackController } from '../fallback';

jest.mock('../error');

describe('fallbackController', async () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  it('should call the error controller passing NOT_FOUND error argument', async () => {

    const expectedErrorArg: any = hancockNotFoundError;

    await fallbackController(req, res, next);

    expect(errorController).toHaveBeenCalledWith(expectedErrorArg, req, res, next);

  });

});