import {
    SignTxController,
    SendTxController,
    SendSignedTxController,
  } from '../controllers/ethereum';

import {NextFunction, Request, Response, Router} from 'express';

import "jest";
import * as domain from '../domain/ethereum';

jest.mock('../domain/ethereum');

describe("SignTxController", async () => {
  let req: any = {
    body: {
      rawTx: 'whatever',
      provider: 'mockProvider'
    }
  };
  let res: any = {
    send: jest.fn()
  };
  let next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it("should sign tx success", async () => {
    await SignTxController(req, res, next);
    expect((domain.signTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.signTx as jest.Mock).mock.calls).toEqual([['whatever', 'mockProvider']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it("should call next on error", async () => {

    (domain.signTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await SignTxController(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls).toEqual([['Boom!']])
  });
});

describe("SendTxController", async () => {
  let req: any = {
    body: {
      tx: 'whatever'
    }
  };
  let res: any = {
    send: jest.fn()
  };
  let next = jest.fn();

  beforeEach(() => {
    next.mockReset();
    res.send.mockReset();
  });

  it("should send tx success", async () => {
    await SendTxController(req, res, next);
    expect((domain.sendTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.sendTx as jest.Mock).mock.calls).toEqual([['whatever']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it("should call next on error", async () => {

    (domain.sendTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await SendTxController(req, res, next);
    expect(next.mock.calls.length).toBe(1);
    expect(next.mock.calls).toEqual([['Boom!']])
  });
});

/*describe("SendTxController", async () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const success = true;

  beforeEach(() => {
  });

  it("should send tx success", async () => {
    await SendTxController(req, res, next);
    expect(SignTxController).toEqual(success);
  });

  it("should call send tx", async () => {
    await SendTxController(req, res, next);
    expect(SendTxController).toHaveBeenCalled();
  });

  it("should call next on error", async () => {
    const err = new Error();
    await SendTxController(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});

describe("SendSignedTxController", async () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const success = true;

  beforeEach(() => {
  });

  it("should send signed tx success", async () => {
    await SendSignedTxController(req, res, next);
    expect(SignTxController).toEqual(success);
  });

  it("should call send signed tx", async () => {
    await SendSignedTxController(req, res, next);
    expect(SendSignedTxController).toHaveBeenCalled();
  });

  it("should call next on error", async () => {
    const err = new Error();
    await SendSignedTxController(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});*/



