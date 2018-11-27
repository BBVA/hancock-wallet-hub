// tslint:disable-next-line:variable-name
export const __mockWeb3__ = {
  eth: {
    sendSignedTransaction: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn().mockImplementation((kind: string, func) => {
          func('mockWhatever');
        }),
      };
    }),
    sendTransaction: jest.fn().mockImplementation(() => {
      const promise = Promise.resolve('whatever');
      (promise as any).on = jest.fn().mockReturnValue(promise);
      return promise;
    }),
    net: {
      isListening: jest.fn().mockImplementation(() => {
        return Promise.resolve(true);
      }),
    },
  },
};

export const getWeb3 = jest.fn().mockResolvedValue(__mockWeb3__);

export const initWeb3 = jest.fn();
