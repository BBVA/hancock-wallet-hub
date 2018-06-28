import 'jest';
import { ErrorController, ErrorMap, Errors } from '../error';

jest.mock('../../utils/config');

describe('errorController', async () => {

 global.console = {
   error: jest.fn(),
   log: jest.fn(),
 } as any;

 let error: any;
 let req: any;
 let res: any;
 let next: any;

 beforeEach(() => {

   error = {
     message: Errors.NOT_FOUND,
   };

   req = {};

   res = {
     json: jest.fn(),
     status: jest.fn().mockImplementation(() => res),
   };

   next = jest.fn();

 });

 it('should return the correct status code and error body given an specific error', async () => {

   const expectedBody = ErrorMap[Errors.NOT_FOUND];
   await ErrorController(error, req, res, next);

   expect(res.status.mock.calls).toEqual([[expectedBody.code_http]]);
   expect(res.json.mock.calls).toEqual([[expectedBody]]);
   expect(console.error).toHaveBeenCalledWith(expectedBody.message);
   expect(console.error).toHaveBeenCalledWith(error);


 });

 it('should return the default status code and error body when the given error is not matched', async () => {

   const expectedBody = ErrorMap[Errors.DEFAULT_ERROR];
   await ErrorController(new Error('WHATEVER'), req, res, next);

   expect(res.status.mock.calls).toEqual([[expectedBody.code_http]]);
   expect(res.json.mock.calls).toEqual([[expectedBody]]);
   expect(console.error).toHaveBeenCalledWith(expectedBody.message);
   expect(console.error).toHaveBeenCalledWith(error);

 });

});