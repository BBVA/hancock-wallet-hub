import {
    CryptoUtils,
  } from '../crypto';

import {NextFunction, Request, Response, Router} from 'express';

import 'jest';

import * as forge from 'node-forge';
jest.mock('node-forge');

describe('aesGCMEncrypt', async () => {

    const data = 'data';
    const iv = 'symetrickey';
    const aad = 'address';
    const key = 'key';

  // beforeEach(() => {
  // });

    (forge.__cipher__.mode.tag.toHex as jest.Mock).mockReturnValue('mockedTag');
    (forge.util.encode64 as jest.Mock).mockReturnValue('mockedData');
    (forge.util.hexToBytes as jest.Mock).mockReturnValue('mockedKey');
    it('should Encrypt the message', () => {
    const result = CryptoUtils.aesGCMEncrypt(data, iv, aad, key);
    expect((forge.cipher.createCipher as jest.Mock)).toHaveBeenCalled();
    expect((forge.cipher.createCipher as jest.Mock)).toHaveBeenCalledWith('AES-GCM', 'mockedKey');
    // expect(res.send.mock.calls.length).toBe(1);
    // expect(res.send.mock.calls).toEqual([['resolved']]);

    expect(result).toEqual({
      aad: 'address',
      data: 'mockedData',
      iv: 'symetrickey',
      tag: 'mockedTag',
    });
  });

//   it("should call next on error", async () => {

//     (domain.signTx as jest.Mock).mockImplementationOnce((args) => {
//       return Promise.reject('Boom!');
//     })

//     await SignTxController(req, res, next);
//     expect(next.mock.calls.length).toBe(1);
//     expect(next.mock.calls).toEqual([['Boom!']])
//   });
// });

// describe("SendTxController", async () => {
//   let req: any = {
//     body: {
//       tx: 'whatever'
//     }
//   };
//   let res: any = {
//     send: jest.fn()
//   };
//   let next = jest.fn();

//   beforeEach(() => {
//     next.mockReset();
//     res.send.mockReset();
//   });

//   it("should send tx success", async () => {
//     await SendTxController(req, res, next);
//     expect((domain.sendTx as jest.Mock).mock.calls.length).toBe(1);
//     expect((domain.sendTx as jest.Mock).mock.calls).toEqual([['whatever']]);
//     expect(res.send.mock.calls.length).toBe(1);
//     expect(res.send.mock.calls).toEqual([['resolved']]);
//   });

//   it("should call next on error", async () => {

//     (domain.sendTx as jest.Mock).mockImplementationOnce((args) => {
//       return Promise.reject('Boom!');
//     })

//     await SendTxController(req, res, next);
//     expect(next.mock.calls.length).toBe(1);
//     expect(next.mock.calls).toEqual([['Boom!']])
//   });
// });

// describe("SendSignedTxController", async () => {
//   let req: any = {
//     body: {
//       tx: 'whatever'
//     }
//   };
//   let res: any = {
//     send: jest.fn()
//   };
//   let next = jest.fn();

//   beforeEach(() => {
//     next.mockReset();
//     res.send.mockReset();
//   });

//   it("should send tx success", async () => {
//     await SendSignedTxController(req, res, next);
//     expect((domain.sendSignedTx as jest.Mock).mock.calls.length).toBe(1);
//     expect((domain.sendSignedTx as jest.Mock).mock.calls).toEqual([['whatever']]);
//     expect(res.send.mock.calls.length).toBe(1);
//     expect(res.send.mock.calls).toEqual([['resolved']]);
//   });

//   it("should call next on error", async () => {

//     (domain.sendSignedTx as jest.Mock).mockImplementationOnce((args) => {
//       return Promise.reject('Boom!');
//     })

//     await SendSignedTxController(req, res, next);
//     expect(next.mock.calls.length).toBe(1);
//     expect(next.mock.calls).toEqual([['Boom!']])
//   });
// });
