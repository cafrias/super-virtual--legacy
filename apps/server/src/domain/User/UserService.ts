import PasswordService from '../../lib/Auth/PasswordService';

export default class UserService {
  static async getEncryptedPassword(password: string): Promise<string> {
    // Check password strength
    PasswordService.checkPasswordStrength(password);

    // Encrypt password
    return PasswordService.encrypt(password);
  }

  // Why we don't have a `createUser` method here?
  // Well, check the domain model and you'll find that User is an
  // abstract class. You should only instantiate User's children
  // But the problem is that Mongoose doesn't no provide any mechanism against
  // abstract instantiation, boomer! The approach taken is to create
  // entities through their corresponding service, this convention
  // will most likely circumvent the issue.
}
