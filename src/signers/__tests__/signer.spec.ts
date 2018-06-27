import 'jest';
import * as jwt from 'jsonwebtoken';
import * as request from 'request-promise-native';
import { v4 as uuidv4 } from 'uuid';
import config from '../../utils/config';
import { Signer } from '../signer';

jest.mock('../../utils/crypto');
jest.mock('request-promise-native');
jest.mock('jsonwebtoken');
jest.mock('uuid');
jest.mock('../../utils/config');

describe('consumer', () => {

  let testSigner: Signer;
  let tx: any;
  let endpoint: string;

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
    endpoint = 'mockEndpoint';
    testSigner = new Signer(endpoint);

  });

  it('should call signTx successfully', async () => {

    (request.post as any) = jest.fn().mockReturnValue(Promise.resolve(true));
    const spy = jest.spyOn(Signer.prototype, 'getSenderFromRawTx')
    .mockImplementation(() => 'mock');
    await testSigner.signTx(tx);
    expect(spy).toHaveBeenCalledWith(tx);
    spy.mockRestore();
  });

  it('should throw exception', async () => {

    try {
      await testSigner.signTx(null);
      fail('it should fail');
    } catch (error) {
      expect(error).toBeDefined();
    }

  });

  it('call getSenderFromRawTx should return sender successfully', async () => {

    const response = (testSigner as any).getSenderFromRawTx(tx);
    expect(response).toBe(tx.from);

  });

  it('call getReceiverFromRawTx should return sender successfully', async () => {

    const response = (testSigner as any).getReceiverFromRawTx(tx);
    expect(response).toBe(tx.to);

  });

});
