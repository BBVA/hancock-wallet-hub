import {
    SignTxController,
    SendTxController,
    SendSignedTxController,
  } from '../../src/controllers/ethereum';

import {NextFunction, Request, Response, Router} from 'express';

import {
    IApiSendSignedTxRequest,
    IApiSendSignedTxResponse,
    IApiSendTxResponse,
    IApiSignTxRequest,
    IApiSignTxResponse,
  } from '../../src/models/ethereum';

  const controller = require('../src/controllers/ethereum.ts')

//import {} from "jest";

describe("SignTxController", async () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const success = true;

  beforeEach(() => {
  });

  it("should sign tx success", async () => {
    await SignTxController(req, res, next);
    responseData = JSON.parse(res.body)
    expect(responseData.success).toEqual(success);
  });

  it("should call sign tx", async () => {
    await SignTxController(req, res, next);
    expect(SignTxController).toHaveBeenCalled();
  });

  it("should call next on error", async () => {
    const err = new Error();
    //throw err
    await SignTxController(req, res, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});

describe("SendTxController", async () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  const success = true;

  beforeEach(() => {
  });

  it("should send tx success", async () => {
    await SendTxController(req, res, next);
    responseData = JSON.parse(res)
    expect(responseData.success).toEqual(success);
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
    responseData = JSON.parse(res)
    expect(responseData.success).toEqual(success);
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
});



