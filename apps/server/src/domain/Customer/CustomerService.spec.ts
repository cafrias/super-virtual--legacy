import CustomerService from './CustomerService';
import PasswordService from '../../lib/Auth/PasswordService';
import WeakPasswordError from '../../lib/Auth/errors/WeakPasswordError';

describe('UserService', () => {
  describe('createUser', () => {
    const email = 'user@example.com';
    const password = 'A_Safe_0n1';

    it('creates correctly', async () => {
      const created = await CustomerService.createCustomer({
        email,
        password,
      });

      // password should be encrypted
      expect(await PasswordService.compare(password, created.password)).toBe(
        true
      );
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

    it('fails when password is weak', async () => {
      await expect(
        CustomerService.createCustomer({
          email,
          password: '123456',
        })
      ).rejects.toThrow(WeakPasswordError);
    });
  });
});
