import 'jest';
import * as jwt from 'jsonwebtoken';
import * as request from 'request-promise-native';
import { v4 as uuidv4 } from 'uuid';
import config from '../../utils/config';
import { CryptvaultSigner } from '../cryptvaultSigner';

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
    jest.restoreAllMocks();

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

  });

  it('should call singTx method succesfully', async () => {

    (request.get as any) = jest.fn().mockReturnValueOnce(response);
    (request.post as any) = jest.fn().mockReturnValueOnce(response2);

    const getTokenspy = jest.spyOn(CryptvaultSigner.prototype, 'getToken')
    .mockImplementation(() => Promise.resolve('whatever'));

    const responseData = await (testSigner as any).signTx(tx);

    expect(getTokenspy).toHaveBeenCalledTimes(1);
    expect(responseData).toEqual({ success: true });

    getTokenspy.mockRestore();

  });

  it('should call singTx method and throw first error', async () => {

    response.result.status_code = 500;

    (request.get as any) = jest.fn().mockReturnValueOnce(response);

    const getTokenspy = jest.spyOn(CryptvaultSigner.prototype, 'getToken')
    .mockImplementation(() => Promise.resolve('whatever'));

    try {
      await (testSigner as any).signTx(tx);
      fail('it should fail');
    } catch (error) {
      expect(error).toBeDefined();
    }

    getTokenspy.mockRestore();

  });

  it('should call singTx method and throw first error', async () => {

    response2.result.status_code = 500;

    (request.get as any) = jest.fn().mockReturnValueOnce(response);
    (request.post as any) = jest.fn().mockReturnValueOnce(response2);
    
    const getTokenspy = jest.spyOn(CryptvaultSigner.prototype, 'getToken')
    .mockImplementation(() => Promise.resolve('whatever'));

    try {
      await (testSigner as any).signTx(tx);
      fail('it should fail');
    } catch (error) {
      expect(error).toBeDefined();
    }

    getTokenspy.mockRestore();

  });

  // it('should call cypherAndSendTransfer method on notify of not tx', async () => {

  //   event.kind = 'log';

  //   const spy = jest.spyOn(Consumer.prototype, 'notify')
  //   .mockImplementation(() => Promise.resolve(true));
  //   await testSigner.notify(event);
  //   expect(spy).toHaveBeenCalledWith(event);
  //   spy.mockRestore();
  // });

  // it('should call cypherAndSendTransfer method successfully', async () => {

  //   const response = {
  //     data: {
  //       item_id: 'mockid',
  //       public_key: 'mockKey',
  //     },
  //     result: {
  //       description: 'mockdes',
  //       internal_code: 'mockcode',
  //       status_code: 200,
  //     },
  //   };
  //   (request.get as any) = jest.fn().mockReturnValue(response);

  //   const getTokenspy = jest.spyOn(CryptvaultSigner.prototype, 'getToken')
  //   .mockImplementation(() => Promise.resolve('whatever'));
  //   const getTxDirectionspy = jest.spyOn(CryptvaultSigner.prototype, 'getTxDirection')
  //   .mockImplementation(() => Promise.resolve('whatever'));
  //   const spy = jest.spyOn(Consumer.prototype, 'notify')
  //   .mockImplementation(() => Promise.resolve(true));

  //   await (testSigner as any).cypherAndSendTransfer(event);

  //   expect(getTokenspy).toHaveBeenCalledTimes(1);
  //   expect(getTxDirectionspy).toHaveBeenCalledTimes(1);
  //   expect(spy).toHaveBeenCalledTimes(1);

  //   getTokenspy.mockRestore();
  //   getTxDirectionspy.mockRestore();
  //   spy.mockRestore();
  // });

  // it('should call cypherAndSendTransfer method and throw exception', async () => {

  //   const response = {
  //     data: {
  //       item_id: 'mockid',
  //       public_key: 'mockKey',
  //     },
  //     result: {
  //       description: 'mockdes',
  //       internal_code: 'mockcode',
  //       status_code: 500,
  //     },
  //   };
  //   (request.get as any) = jest.fn().mockReturnValue(response);

  //   const getTokenspy = jest.spyOn(CryptvaultSigner.prototype, 'getToken')
  //   .mockImplementation(() => Promise.resolve('whatever'));
  //   const getTxDirectionspy = jest.spyOn(CryptvaultSigner.prototype, 'getTxDirection')
  //   .mockImplementation(() => Promise.resolve('whatever'));
  //   const spy = jest.spyOn(Consumer.prototype, 'notify')
  //   .mockImplementation(() => Promise.resolve(true));

  //   try {
  //     await (testSigner as any).cypherAndSendTransfer(event);
  //     fail('it should fail');
  //   } catch (error) {
  //     expect(error).toBeDefined();
  //   }

  //   getTokenspy.mockRestore();
  //   getTxDirectionspy.mockRestore();
  //   spy.mockRestore();
  // });

  // it('should call getToken method successfully', () => {

  //   (testSigner as any).getToken();
  //   expect(jwt.sign).toHaveBeenCalledTimes(1);
  //   expect(jwt.sign).toHaveBeenCalledWith(
  //     {
  //       iss: config.consumers.cryptvault.credentials.key,
  //       txid: uuidv4(),
  //      },
  //      config.consumers.cryptvault.credentials.secret,
  //      { expiresIn: config.consumers.cryptvault.credentials.expires_in },
  //   );
  // });

});
