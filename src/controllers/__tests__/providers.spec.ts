import 'jest';

import {createProvider} from '../../controllers/provider';

jest.mock('../../domain/ethereum');
jest.mock('../../utils/logger');
jest.mock('../../utils/config');

jest.mock('../../utils/config');
jest.mock('../../utils/db');
jest.mock('../../utils/logger');
jest.mock('mongodb');

describe('CreateProviders', async () => {
  const req: any = {
    body: {
      providerName: 'singleProvider',
      protocol: 'single',
      singEndPoint: 'http://hancock_sign_provider:3000/ethereum/sign-tx',
      jwt: '',
      recoverPkEndPoint: ''
    },
    headers: {},
  };
  const res: any = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => res),
    json: jest.fn().mockImplementation(() => res),
  };
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it('create provider ok', async () => {

    await createProvider(req, res, next);

    expect(res.send.mock.calls).toEqual([]);
  });

});
