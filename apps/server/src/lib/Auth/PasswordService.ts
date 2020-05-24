import zxcvbn from 'zxcvbn';
import * as bcrypt from 'bcrypt';
import WeakPasswordError from './errors/WeakPasswordError';

const SALT_ROUNDS = 10;
const MIN_PASSWORD_STRENGTH_SCORE = 3;

export default class PasswordService {
  static async encrypt(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plainText, salt);
  }

  static async compare(plainText: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(plainText, encrypted);
  }

  /**
   * @param plainText
   * @throws {}
   */
  static checkPasswordStrength(plainText: string): void {
    const { score } = zxcvbn(plainText);

    if (score < MIN_PASSWORD_STRENGTH_SCORE) {
      throw new WeakPasswordError(plainText);
    }
  }
}
