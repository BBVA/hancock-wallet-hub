import 'jest';

// tslint:disable-next-line:variable-name
const __logger__ = {
  fatal: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
};

export const logger = jest.fn().mockReturnValue(__logger__);
export default logger;
