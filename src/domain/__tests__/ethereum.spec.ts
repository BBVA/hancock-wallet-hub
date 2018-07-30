import {
  sendSignedTx,
  sendTx,
  signTx,
} from '../../domain/ethereum';

import 'jest';
import { IEthereumRawTransaction } from '../../models/ethereum';
import * as signerFactory from '../../signers/signerFactory';
import * as ethereumUtils from '../../utils/ethereum';
import { hancockEthereumSendSignedTransactionError, hancockEthereumSendTransactionError } from '../model';

jest.mock('../../signers/signerFactory');
jest.mock('../../utils/ethereum');
jest.mock('../../utils/logger');

describe('signTx', async () => {

  const provider = 'mockProvider';
  const rawTx: IEthereumRawTransaction = {} as any;
  const signer = {
    signTx: jest.fn(),
  };
  const aa = signerFactory.getSigner as jest.Mock;

  beforeEach(() => {

    signer.signTx.mockReset();
    aa.mockReset();

  });

  it('should sign tx success', async () => {

    aa.mockResolvedValue(Promise.resolve(signer));

    await signTx(rawTx, provider);
    expect(aa).toHaveBeenCalled();
    expect(aa).toHaveBeenCalledWith('mockProvider');

  });

});

describe('sendTx', async () => {

  const rawTx = 'whatever';

  // tslint:disable-next-line:variable-name
  const web3Mock = (ethereumUtils as any).__mockWeb3__.eth.sendTransaction as jest.Mock;

  beforeEach(() => {
    web3Mock.mockClear();
  });

  it('should send tx success', async () => {

    await sendTx(rawTx);
    expect(web3Mock).toHaveBeenCalled();
    expect(web3Mock).toHaveBeenCalledWith('whatever');
  });

  it('should reject on error when try to send a tx', async () => {

    (web3Mock as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject(new Error('Boom!'));
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    });

    try {

      await sendTx(rawTx);

      fail('test should not reach this step');

    } catch (e) {

      console.log(e);
      expect(e).toEqual(hancockEthereumSendTransactionError);

    }

    expect(web3Mock).toHaveBeenCalled();
    expect(web3Mock).toHaveBeenCalledWith('whatever');

  });
});

describe('sendSignedTx', () => {

  const tx = 'whatever';

  // tslint:disable-next-line:variable-name
  const web3Mock = (ethereumUtils as any).__mockWeb3__.eth.sendSignedTransaction as jest.Mock;

  beforeEach(() => {
    web3Mock.mockClear();
  });

  it('should send and sign tx success', async () => {

    await sendSignedTx(tx);
    expect(web3Mock).toHaveBeenCalled();
    expect(web3Mock).toHaveBeenCalledWith('whatever');

  });

  it('should reject on error when try send and sign a tx', async () => {

    (web3Mock as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject(new Error('Boom!'));
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    });

    try {

      await sendSignedTx(tx);

      fail('test should not reach this step');

    } catch (e) {

      expect(e).toEqual(hancockEthereumSendSignedTransactionError);

    }

    expect(web3Mock).toHaveBeenCalled();
    expect(web3Mock).toHaveBeenCalledWith('whatever');

  });
});

describe('_getSenderFromRawTx', () => {

  const rawTx: any = {
    from: 'whatever',
  };

  it('should return a string with receiver of tx', () => {

    expect(rawTx.from).toEqual('whatever');

  });
});

describe('_getReceiverFromRawTx', () => {

  const rawTx: any = {
    to: 'whatever',
  };

  it('should return a string with transmitter of tx', () => {

    expect(rawTx.to).toEqual('whatever');

  });
});
