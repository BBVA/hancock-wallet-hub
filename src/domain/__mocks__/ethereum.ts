export const signTx = jest.fn().mockImplementation((): Promise<any> => {
    return Promise.resolve('resolved');
});

export const sendTx = jest.fn().mockImplementation((): Promise<any> => {
    return Promise.resolve('resolved');
});