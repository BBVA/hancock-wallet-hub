// tslint:disable-next-line:variable-name
export const __cryptvaultSignerInstance__ = {
  getToken: jest.fn().mockReturnThis(),
  signTx: jest.fn().mockReturnThis(),
};

// tslint:disable-next-line:variable-name
export const CryptvaultSigner = jest.fn().mockImplementation(() => __cryptvaultSignerInstance__);
