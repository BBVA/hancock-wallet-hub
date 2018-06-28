export const getSigner = jest.fn().mockImplementation((): Promise<any> => {
    return Promise.resolve(true);
});
