import { Router } from 'express';

export const coll = {
        use: jest.fn().mockImplementation(() => {        
            return Router;
        }),
        liste: jest.fn().mockImplementation(() => {        
            return 'error';
        })
  };

export const AppRouter = jest.fn().mockResolvedValue(coll);
