import {
    HealthCheckController,
  } from '../../controllers/healthcheck';

import "jest";

import {NextFunction, Request, Response, Router} from 'express';

describe('HealthCheckController', () => {

    let req: any = {
        body: {
          rawTx: 'whatever',
          provider: 'mockProvider'
        }
      };
  
    let next = jest.fn();

    let res= {
        status: 200,
        json: {
          success: true,
        }
    };
  
    it('should healthcheck return Ok', () => {
      HealthCheckController(req, res, next);
      expect(res.status).toEqual(200);
      expect(res.json.success).toEqual(true);
  
    });
  });
  