
import 'jest';
import { healthCheckController } from '../healthcheck';

jest.mock('../../utils/config');

describe('HealthcheckController', async () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {

    req = {};

    res = {
      json: jest.fn(),
      status: jest.fn().mockImplementation(() => res),
    };

    next = jest.fn();

  });

  it('should return 200 and state', async () => {

    await healthCheckController(req, res, next);

    expect(res.status.mock.calls).toEqual([[200]]);
    expect(res.json.mock.calls).toEqual([[{
      success: true,
    }]]);

  });

});