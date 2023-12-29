// import { Sequelize } from 'sequelize';
// import { userSignUp } from './user.model';

// // Mock the sequelize module and authenticate method
// jest.mock('sequelize', () => ({
//   authenticate: jest.fn(),
// }));

// // Mock the user module and findAll method
// jest.mock('./user.model', () => ({
//   findAll: jest.fn(),
// }));

// describe('userSignUp', () => {
//   beforeEach(() => {
//     // Clear the mock implementation and mockReturnValue of the mock functions
//     // (Sequelize.authenticate as jest.Mock).mockClear();
//     (userSignUp as jest.Mock).mockClear();
//     (userSignUp as jest.Mock).mockResolvedValueOnce({});
//   });

//   it('should authenticate sequelize and query the user table with the provided email', async () => {
//    const mockAuthenticate = Sequelize.authenticate as jest.Mock;
//     const mockFindAll = userSignUp as jest.Mock;

//     const email = 'test@example.com';
//     const password = 'test123';

//     const body = {
//       email,
//       password,
//     };

//     await userSignUp(body);

//     expect(mockAuthenticate).toHaveBeenCalled();
//     expect(mockFindAll).toHaveBeenCalledWith({
//       where: {
//         email,
//       },
//     });
//   });

//   it('should return the expected response structure', async () => {
//     const mockFindAll = userSignUp as jest.Mock;

//     const email = 'test@example.com';
//     const password = 'test123';

//     const body = {
//       email,
//       password,
//     };

//     const fakeResponse = {
//       success: true,
//       data: {},
//       message: 'User signed up successfully.',
//       status: 200,
//     };

//     mockFindAll.mockResolvedValueOnce([{}]); // Mock the result of user.findAll

//     const response = await userSignUp(body);

//     expect(response).toEqual(fakeResponse);
//   });
// });
