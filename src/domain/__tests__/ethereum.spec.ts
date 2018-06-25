import {
    signTx,
    sendTx,
    sendSignedTx,
  } from '../../domain/ethereum';

import 'jest';
import * as signerFactory from '../../signers/signerFactory';
import * as web3 from '../../utils/web3';

jest.mock('../../signers/signerFactory');
jest.mock('../../utils/web3');

describe('signTx', async () => {

  let  rawTx: any;
  let  provider = 'mockProvider';
  const signer = {
    signTx: jest.fn()
  };
  const aa = signerFactory.getSigner as jest.Mock;

  beforeEach(() => {

    signer.signTx.mockReset();
    aa.mockReset();

  });

  it('should sign tx success', async () => {

    aa.mockResolvedValue(Promise.resolve(signer));

    await signTx(rawTx,provider);
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
  
  let  rawTx = 'whatever';

  const __mockWeb3__ = (web3 as any).__mockWeb3__.eth.sendTransaction as jest.Mock;

  beforeEach(() => {
    __mockWeb3__.mockClear();
  });

  it('should send tx success', async () => {

    await sendTx(rawTx);
    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);
  });

  it('should reject on error', async () => {

    (__mockWeb3__ as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject('Boom!');
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    })

    try {

      await sendTx(rawTx);

      fail('test should not reach this step')

    } catch(e) {

      expect(e).toEqual(new Error('DLT_ERROR'));

    }

    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);

    
  });
});

describe('sendSignedTx', async () => {
  
  let tx = 'whatever';

  const __mockWeb3__ = (web3 as any).__mockWeb3__.eth.sendTransaction as jest.Mock;

  beforeEach(() => {
    __mockWeb3__.mockClear();
  });

  it('should send tx success', async () => {

    await sendTx(tx);
    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);
  });

  it('should reject on error', async () => {

    (__mockWeb3__ as jest.Mock).mockImplementationOnce((args) => {
      const promise = Promise.reject('Boom!');
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    })

    try {

      await sendTx(tx);

      fail('test should not reach this step')

    } catch(e) {

      expect(e).toEqual(new Error('DLT_ERROR'));

    }

    expect(__mockWeb3__.mock.calls.length).toBe(1);
    expect(__mockWeb3__.mock.calls).toEqual([['whatever']]);

    
  });
});



