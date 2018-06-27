// tslint:disable-next-line:variable-name
export const __cipher__ = {
    finish: jest.fn().mockReturnThis(),
    mode: {
        tag: {
            toHex: jest.fn(),
        },
    },
    output: {
        data: jest.fn().mockReturnThis(),
    },
    start: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
  };

export const cipher = {
    createCipher: jest.fn().mockReturnValue(__cipher__),
};

export const tag = {
    toHex: jest.fn().mockReturnThis(),
};

export const util = {
    createBuffer: jest.fn().mockReturnThis(),
    encode64: jest.fn(),
    hexToBytes: jest.fn(),
};
