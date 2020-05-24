import UserService from './UserService';
import PasswordService from '../Auth/PasswordService';
import WeakPasswordError from '../Auth/errors/WeakPasswordError';

describe('UserService', () => {
  describe('createUser', () => {
    it('creates correctly', async () => {
      const password = 'A_Safe_0n1';
      const created = await UserService.createUser({
        email: 'user@example.com',
        password,
      });

      // password should be encrypted
      expect(await PasswordService.compare(password, created.password)).toBe(
        true
      );
    });

    it('fails when email is invalid', async () => {
      await expect(
        UserService.createUser({
          email: 'invalid',
          password: 'A_Safe_0n1',
        })
      ).rejects.toThrow();
    });

    it('fails when password is weak', async () => {
      await expect(
        UserService.createUser({
          email: 'user@example.com',
          password: '123456',
        })
      ).rejects.toThrow(WeakPasswordError);
    });
  });
});
