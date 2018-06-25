import {
    getProviderByAlias,
    getContractByAddress,
  } from '../../db/ethereum';

import "jest";
import * as db from '../../db/ethereum';

jest.mock('../../db/ethereum');

describe("getProviderByAlias", async () => {
  let alias = 'whatever';

  beforeEach(() => {
  });

  it("should get a provider of data base with a specific alias", async () => {
    await getProviderByAlias(alias);
    expect(((db as any).getCollection as jest.Mock).mock.calls.length).toBe(1);
    expect(((db as any).getCollection as jest.Mock).mock.calls).toEqual([['provider']]);
  });
});
