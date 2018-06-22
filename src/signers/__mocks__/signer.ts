const mockSigner = jest.fn();

export default jest.fn().mockImplementation(() => {
    return {signer: mockSigner};
  });