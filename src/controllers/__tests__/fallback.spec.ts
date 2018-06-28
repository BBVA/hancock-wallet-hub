import 'jest';
import { ErrorController, Errors } from '../error';
import { FallbackController } from '../fallback';

jest.mock('../error');

describe('fallbackController', async () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  it('should call the error controller passing NOT_FOUND error argument', async () => {

    const expectedErrorArg: any = { message: Errors.NOT_FOUND };

    await FallbackController(req, res, next);

    expect(ErrorController).toHaveBeenCalledWith(expectedErrorArg, req, res, next);

  });

});