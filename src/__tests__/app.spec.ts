import 'jest';
import { run } from '../app';

import * as db from '../utils/db';

import * as ethereumDb from '../db/ethereum';

jest.mock('../utils/config');

jest.mock('../utils/db');

jest.mock('../routes/index');

jest.mock('mongodb');

describe('run', async () => {

  it('::run should init successfully', async () => {

    const connectDbMock = (db.connect as jest.Mock);

    connectDbMock.mockResolvedValue('');

    await run();

    expect(connectDbMock.mock.calls.length).toBe(1);

  });
});

