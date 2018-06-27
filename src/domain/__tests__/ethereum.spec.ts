import {
  sendSignedTx,
  sendTx,
  signTx,
} from '../../domain/ethereum';

import 'jest';
import { IEthereumRawTransaction } from '../../models/ethereum';
import * as signerFactory from '../../signers/signerFactory';
import * as ethereumUtils from '../../utils/ethereum';

jest.mock('../../signers/signerFactory');
jest.mock('../../utils/ethereum');

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
    expect(aa.mock.calls.length).toBe(1);
    expect(aa.mock.calls).toEqual([['mockProvider']]);

  });

  // it("should throw an error", async () => {

  //   //(signerFactory.getSigner as jest.Mock).mockImplementationOnce((args) => {
  //   //  return Promise.reject('Boom!');
  //   //})
  //   aa.mockResolvedValue(Promise.reject(new Error('Boom!')));

  //   await signTx(rawTx,provider);
  //   expect(signer.signTx.mock.calls.length).toBe(1);
  //   expect(signer.signTx.mock.calls).toEqual([['Boom!']])
  // });
});

describe('sendTx', async () => {

  const rawTx = 'whatever';

  // tslint:disable-next-line:variable-name
  const __mockWeb3__ = (ethereumUtils as any).__mockWeb3__.eth.sendTransaction as jest.Mock;

  beforeEach(() => {
    __mockWeb3__.mockClear();
  });

  it('should send tx success', async () => {

    await sendTx(rawTx);
    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);
  });

  it('should reject on error when try to send a tx', async () => {

    (__mockWeb3__ as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject('Boom!');
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    });

    try {

      await sendTx(rawTx);

      fail('test should not reach this step');

    } catch (e) {

      expect(e).toEqual(new Error('DLT_ERROR'));

    }

    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);

  });
});

describe('sendSignedTx', async () => {

  const tx = 'whatever';

  // tslint:disable-next-line:variable-name
  const __mockWeb3__ = (ethereumUtils as any).__mockWeb3__.eth.sendSignedTransaction as jest.Mock;

  beforeEach(() => {
    __mockWeb3__.mockClear();
  });

  it('should send and sign tx success', async () => {

    await sendSignedTx(tx);
    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);
  });

  it('should reject on error when try send and sign a tx', async () => {

    (__mockWeb3__ as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject('Boom!');
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    });

    try {

      await sendSignedTx(tx);

      fail('test should not reach this step');

    } catch (e) {

      expect(e).toEqual(new Error('DLT_ERROR'));

    }

    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);

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
