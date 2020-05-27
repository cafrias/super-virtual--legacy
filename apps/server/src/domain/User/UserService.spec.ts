import UserService from './UserService';
import PasswordService from '../../lib/Auth/PasswordService';
import WeakPasswordError from '../../lib/Auth/errors/WeakPasswordError';

describe('UserService', () => {
  describe('getEncryptedPassword', () => {
    it('when password is OK, returns encrypted password', async () => {
      const password = 'A_Safe_0n1';
      const hashed = await UserService.getEncryptedPassword(password);

      expect(await PasswordService.compare(password, hashed)).toBe(true);
    });

    it('when password is weak, fails', async () => {
      await expect(UserService.getEncryptedPassword('123456')).rejects.toThrow(
        WeakPasswordError
      );
    });
  });
});
