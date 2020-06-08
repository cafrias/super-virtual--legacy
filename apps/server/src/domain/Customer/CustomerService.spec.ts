import CustomerService from './CustomerService';
import UserService from '../User/UserService';

jest.mock('../User/UserService');

const mockedUserService = (UserService as unknown) as jest.Mock<
  typeof UserService
>;

describe('CustomerService', () => {
  describe('createCustomer', () => {
    const email = 'user@example.com';
    const password = 'A_Safe_0n1';

    beforeEach(() => {
      mockedUserService.mockClear();
    });

    it('creates correctly', async () => {
      const customer = await CustomerService.createCustomer({
        email,
        password,
      });

      expect(UserService.getEncryptedPassword).toHaveBeenCalledTimes(1);
      expect(customer.shoppingCart).toBeDefined();
    });

    it('when address defined, creates correctly', async () => {
      const address =
        'Av. Siempreviva 123, Springfield, Taxachussets, Homerolandia';
      const created = await CustomerService.createCustomer({
        email,
        password,
        address,
      });

      expect(created.address).toBe(address);
    });

    it('fails when email is invalid', async () => {
      await expect(
        CustomerService.createCustomer({
          email: 'invalid',
          password,
        })
      ).rejects.toThrow();
    });
  });
});
