import 'jest';

import { HealthCheckController } from '../../controllers/__mocks__/healthcheck';
import * as healthcheck from '../healthcheck';

import request = require('supertest');

jest.mock('../../controllers/healthcheck');

describe('HealthCheckRouter', () => {

  it('::run should route healthcheck', () => {
    healthcheck.HealthCheckRouter.get('mockrouter', HealthCheckController );
  });
});

describe('HealthCheckRouter', () => {
    test('::It should response the GET method', () => {
        return request(healthcheck).get('/').then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
});
