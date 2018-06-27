// tslint:disable-next-line:variable-name
export const __signerInstance__ = {
  getReceiverFromRawTx: jest.fn().mockReturnThis(),
  getSenderFromRawTx: jest.fn().mockReturnThis(),
  signTx: jest.fn().mockReturnThis(),
};

// tslint:disable-next-line:variable-name
export const Signer = jest.fn().mockImplementation(() => __signerInstance__);
