export const signTx = jest.fn().mockImplementation((): Promise<any> => {
    return Promise.resolve('resolved');
});
