import {
    sendSignedTxController,
    sendTxController,
    signTxController,
  } from '../../controllers/ethereum';

import {NextFunction, Request, Response, Router} from 'express';

import 'jest';
import * as domain from '../../domain/ethereum';

jest.mock('../../domain/ethereum');

describe('SignTxController', async () => {
  const req: any = {
    body: {
      provider: 'mockProvider',
      rawTx: 'whatever',
    },
  };
  const res: any = {
    send: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it('should sign tx success', async () => {
    await signTxController(req, res, next);
    expect((domain.signTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.signTx as jest.Mock).mock.calls).toEqual([['whatever', 'mockProvider']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it('should call next on error', async () => {

    (domain.signTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await signTxController(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls).toEqual([['Boom!']])
  });
});

describe('SendTxController', async () => {
  const req: any = {
    body: {
      tx: 'whatever',
    },
  };
  const res: any = {
    send: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it('should send tx success', async () => {
    await sendTxController(req, res, next);
    expect((domain.sendTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.sendTx as jest.Mock).mock.calls).toEqual([['whatever']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it('should call next on error', async () => {

    (domain.sendTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await sendTxController(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls).toEqual([['Boom!']])
  });
});

describe('SendSignedTxController', async () => {
  const req: any = {
    body: {
      tx: 'whatever',
    },
  };
  const res: any = {
    send: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it('should send tx success', async () => {
    await sendSignedTxController(req, res, next);
    expect((domain.sendSignedTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.sendSignedTx as jest.Mock).mock.calls).toEqual([['whatever']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it('should call next on error', async () => {

    (domain.sendSignedTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await sendSignedTxController(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls).toEqual([['Boom!']])
  });
});



