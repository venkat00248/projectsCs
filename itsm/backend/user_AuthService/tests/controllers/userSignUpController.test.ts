// import { Request, Response } from 'express';
// import userModel from '../models/users.model';
// import userSignUpController from './userSignUpController';

// // Mock the userModel module
// jest.mock('../models/users.model', () => ({
//   userSignUp: jest.fn(),
// }));

// describe('userSignUpController', () => {
//   it('should send a response with status 201 when userSignUp succeeds', async () => {
//     const req: Request = {
//       body: {}, // Add your desired request body here
//     } as Request;

//     const res: Response = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as unknown as Response;

//     const fakeResponse = {
//       status: 201,
//       // Add any other properties you expect the response to have
//     };

//     // Mock the userSignUp function to return the fake response
//     (userModel.userSignUp as jest.Mock).mockResolvedValueOnce(fakeResponse);

//     await userSignUpController(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.send).toHaveBeenCalledWith(fakeResponse);
//   });

//   it('should send a response with status 400 when userSignUp fails', async () => {
//     const req: Request = {
//       body: {}, // Add your desired request body here
//     } as Request;

//     const res: Response = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as unknown as Response;

//     const fakeResponse = {
//       status: 400,
//       // Add any other properties you expect the response to have
//     };

//     // Mock the userSignUp function to return the fake response
//     (userModel.userSignUp as jest.Mock).mockResolvedValueOnce(fakeResponse);

//     await userSignUpController(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith(fakeResponse);
//   });
// });
