// const request = require('supertest');
const request = jest.fn();
const app = require('../../routes/healthcheck')
describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').expect(200);
    });
}) 