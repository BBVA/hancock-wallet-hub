import { Router } from 'express';

export const coll = {
        liste: jest.fn().mockImplementation(() => {
            return 'error';
        }),
        use: jest.fn().mockImplementation(() => {
            return Router;
        }),
  };

export const AppRouter = jest.fn().mockResolvedValue(coll);
