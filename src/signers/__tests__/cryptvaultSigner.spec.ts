import 'jest';
import * as request from 'request-promise-native';
import { CryptvaultSigner } from '../cryptvaultSigner';

jest.mock('../../utils/logger');
jest.mock('../../utils/crypto');
jest.mock('request-promise-native');
jest.mock('jsonwebtoken');
jest.mock('uuid');
jest.mock('../../utils/config');

describe('CryptvaultSigner', () => {

  let testSigner: any;
  let tx: any;
  let response: any;
  let response2: any;
  let getTokenspy: jest.Mock;

  beforeEach(() => {

    tx = {
      blockHash: '0x0',
      blockNumber: 1,
      from: '0x0123',
      gas: 10,
      gasPrice: '100000000000',
      hash: '0xab',
      input: '0x1',
      nonce: 1,
      to: '0x0124',
      transactionIndex: 1,
      value: '0',
    };
    testSigner = new CryptvaultSigner('test');

    response2 = {
      data: {
        item_id: 'mockid',
        public_key: 'mockKey',
      },
      result: {
        description: 'mockdes',
        internal_code: 'mockcode',
        status_code: 202,
      },
    };

    response = {
      data: {
        item_id: 'mockid',
        public_key: 'mockKey',
      },
      result: {
        description: 'mockdes',
        internal_code: 'mockcode',
        status_code: 200,
      },
    };

    jest.restoreAllMocks();

    getTokenspy = jest
      .spyOn((CryptvaultSigner.prototype as any), 'getToken')
      .mockImplementation(() => Promise.resolve('whatever'));

  });

  it('should call singTx method succesfully', async () => {

    (request.get as any) = jest.fn().mockReturnValueOnce(response);
    (request.post as any) = jest.fn().mockReturnValueOnce(response2);

    const responseData = await (testSigner as any).signTx(tx);

    expect(getTokenspy).toHaveBeenCalledTimes(1);
    expect(responseData).toEqual({ success: true });

  });

  it('should call singTx method and throw first error', async () => {

    response.result.status_code = 500;

    (request.get as any) = jest.fn().mockReturnValueOnce(response);

    try {
      await (testSigner as any).signTx(tx);
      fail('it should fail');
    } catch (error) {
      expect(error).toBeDefined();
    }

  });

  it('should call singTx method and throw first error', async () => {

    response2.result.status_code = 500;

    (request.get as any) = jest.fn().mockReturnValueOnce(response);
    (request.post as any) = jest.fn().mockReturnValueOnce(response2);

    try {
      await (testSigner as any).signTx(tx);
      fail('it should fail');
    } catch (error) {
      expect(error).toBeDefined();
    }

  });

});
