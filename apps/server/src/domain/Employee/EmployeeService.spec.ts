import EmployeeService from './EmployeeService';
import UserService from '../User/UserService';

jest.mock('../User/UserService');

const mockedUserService = (UserService as unknown) as jest.Mock<
  typeof UserService
>;

describe('EmployeeService', () => {
  beforeEach(() => {
    mockedUserService.mockClear();
  });

  describe('createEmployee', () => {
    const email = 'employee@example.com';
    const password = 'A_Safe_0n1';

    it('creates correctly', async () => {
      const created = await EmployeeService.createEmployee({
        email,
        password,
      });

      expect(UserService.getEncryptedPassword).toHaveBeenCalledTimes(1);

      // generates employeeID
      expect(created.employeeID).toBeDefined();
      expect(created.employeeID).not.toBe('');
    });

    it('fails when email is invalid', async () => {
      await expect(
        EmployeeService.createEmployee({
          email: 'invalid',
          password,
        })
      ).rejects.toThrow();
    });
  });
});
