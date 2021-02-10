// tslint:disable-next-line:variable-name
export const __secureSignerInstance__ = {
  getToken: jest.fn().mockReturnThis(),
  signTx: jest.fn().mockReturnThis(),
};

// tslint:disable-next-line:variable-name
export const SecureSigner = jest.fn().mockImplementation(() => __secureSignerInstance__);
