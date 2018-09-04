import 'jest';
import * as ethereumDomain from '../../domain/ethereum';
import { IEthereumRawTransaction } from '../../models/ethereum';
import * as errorUtils from '../../utils/error';
import * as ethereumUtils from '../../utils/ethereum';
import {
  hancockCantRetrieveSignerError,
  hancockEthereumConnectionError,
  hancockEthereumSendSignedTransactionError,
  hancockEthereumSendTransactionError,
  hancockSignTransactionError,
} from '../model';
import * as signerFactory from '../signers/signerFactory';

jest.mock('../signers/signerFactory');
jest.mock('../../utils/ethereum');
jest.mock('../../utils/logger');
jest.mock('../../utils/error');

describe('ethreumDomain', () => {

  const errorFnMock = errorUtils.error as jest.Mock;

  beforeEach(() => {

    errorFnMock.mockClear();

  });

  describe('signTx', async () => {

    const provider = 'mockProvider';
    const rawTx: IEthereumRawTransaction = {} as any;
    const signer = {
      signTx: jest.fn(),
    };
    const getSignerMock = signerFactory.getSigner as jest.Mock;

    beforeEach(() => {

      signer.signTx.mockClear();
      getSignerMock.mockClear();

    });

    it('should sign tx successfuly', async () => {

      getSignerMock.mockResolvedValue(signer);

      await ethereumDomain.signTx({rawTx, provider});

      expect(getSignerMock).toHaveBeenCalled();
      expect(getSignerMock).toHaveBeenCalledWith('mockProvider');

    });

    it('should fail retrieving the signer', async () => {

      const throwedError: Error = new Error('Boom!');
      getSignerMock.mockRejectedValue(throwedError);

      try {

        await ethereumDomain.signTx({rawTx, provider});
        fail('it should fail');

      } catch (e) {

        expect(getSignerMock).toHaveBeenCalledWith('mockProvider');
        expect(errorFnMock).toHaveBeenCalledWith(hancockCantRetrieveSignerError, throwedError);
        expect(e).toEqual(hancockCantRetrieveSignerError);

      }

    });

    it('should fail signing the transaction', async () => {

      const throwedError: Error = new Error('Boom!');

      signer.signTx.mockRejectedValue(throwedError);
      getSignerMock.mockResolvedValue(signer);

      try {

        await ethereumDomain.signTx({rawTx, provider});
        fail('it should fail');

      } catch (e) {

        expect(getSignerMock).toHaveBeenCalledWith('mockProvider');
        expect(errorFnMock).toHaveBeenCalledWith(hancockSignTransactionError, throwedError);
        expect(e).toEqual(hancockSignTransactionError);

      }

    });

  });

  describe('sendTx', async () => {

    const rawTx = 'whatever';

    // tslint:disable-next-line:variable-name
    const web3Mock = (ethereumUtils as any).__mockWeb3__.eth.sendTransaction as jest.Mock;
    const getWeb3Mock = (ethereumUtils.getWeb3 as jest.Mock);

    beforeEach(() => {
      web3Mock.mockClear();
      getWeb3Mock.mockClear();
    });

    it('should send tx success', async () => {

      await ethereumDomain.sendTx(rawTx);
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

        await ethereumDomain.sendTx(rawTx);

        fail('test should not reach this step');

      } catch (e) {

        console.log(e);
        expect(e).toEqual(hancockEthereumSendTransactionError);

      }

      expect(web3Mock).toHaveBeenCalled();
      expect(web3Mock).toHaveBeenCalledWith('whatever');

    });

    it('should fail retrieving web3 instance', async () => {

      const throwedError: Error = new Error('Boom!');
      getWeb3Mock.mockRejectedValueOnce(throwedError);

      try {

        await ethereumDomain.sendTx(rawTx);
        fail('it should fail');

      } catch (e) {

        expect(errorFnMock).toHaveBeenCalledWith(hancockEthereumConnectionError, throwedError);
        expect(e).toEqual(hancockEthereumConnectionError);

      }

    });

  });

  describe('sendSignedTx', () => {

    const tx = 'whatever';

    // tslint:disable-next-line:variable-name
    const web3Mock = (ethereumUtils as any).__mockWeb3__.eth.sendSignedTransaction as jest.Mock;
    const getWeb3Mock = (ethereumUtils.getWeb3 as jest.Mock);

    beforeEach(() => {
      web3Mock.mockClear();
      getWeb3Mock.mockClear();
    });

    it('should send and sign tx success', async () => {

      await ethereumDomain.sendSignedTx({tx});
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

        await ethereumDomain.sendSignedTx({tx});

        fail('test should not reach this step');

      } catch (e) {

        expect(e).toEqual(hancockEthereumSendSignedTransactionError);

      }

      expect(web3Mock).toHaveBeenCalled();
      expect(web3Mock).toHaveBeenCalledWith('whatever');

    });

    it('should fail retrieving web3 instance', async () => {

      const throwedError: Error = new Error('Boom!');
      getWeb3Mock.mockRejectedValueOnce(throwedError);

      try {

        await ethereumDomain.sendSignedTx({tx});
        fail('it should fail');

      } catch (e) {

        expect(errorFnMock).toHaveBeenCalledWith(hancockEthereumConnectionError, throwedError);
        expect(e).toEqual(hancockEthereumConnectionError);

      }

    });

  });

  describe('_getSenderFromRawTx', () => {

    const rawTx: any = {
      from: 'whatever',
    };

    it('should return a string with receiver of tx', () => {

      const result: string = ethereumDomain._getSenderFromRawTx(rawTx);
      expect(result).toEqual('whatever');

    });
  });

  describe('_getReceiverFromRawTx', () => {

    const rawTx: any = {
      to: 'whatever',
    };

    it('should return a string with transmitter of tx', () => {

      const result: string = ethereumDomain._getReceiverFromRawTx(rawTx);
      expect(result).toEqual('whatever');

    });
  });

});
