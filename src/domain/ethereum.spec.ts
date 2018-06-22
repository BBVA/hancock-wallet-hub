import {
    signTx,
    sendTx,
    sendSignedTx,
  } from '../domain/ethereum';

import "jest";
import * as signerFactory from '../signers/signerFactory';

jest.mock('../signers/signerFactory');

describe("signTx", async () => {

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

  fit("should sign tx success", async () => {

    aa.mockResolvedValue(Promise.resolve(signer));

    await signTx(rawTx,provider);
    expect(aa.mock.calls.length).toBe(1);
    expect(aa.mock.calls).toEqual([['mockProvider']]);

    //expect(signer.signTx.mock.calls.length).toBe(1);
    //expect(signer.signTx.mock.calls).toEqual([['mockProvider']]);

  });

  it("should throw an error", async () => {

    (signerFactory.getSigner as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await signTx(rawTx,provider);
    expect(signer.signTx.mock.calls.length).toBe(1);
    expect(signer.signTx.mock.calls).toEqual([['Boom!']])
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

describe("SendSignedTxController", async () => {
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
    await SendSignedTxController(req, res, next);
    expect((domain.sendSignedTx as jest.Mock).mock.calls.length).toBe(1);
    expect((domain.sendSignedTx as jest.Mock).mock.calls).toEqual([['whatever']]);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send.mock.calls).toEqual([['resolved']]);
  });

  it("should call next on error", async () => {

    (domain.sendSignedTx as jest.Mock).mockImplementationOnce((args) => {
      return Promise.reject('Boom!');
    })

    await SendSignedTxController(req, res, next);
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



