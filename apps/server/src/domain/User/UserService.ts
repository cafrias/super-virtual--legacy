import CreateUserDTO from './dto/CreateUser.dto';
import UserModel, { User } from './User';
import PasswordService from '../../lib/Auth/PasswordService';

export default class UserService {
  static async createUser(input: CreateUserDTO): Promise<User> {
    // Check password strength
    PasswordService.checkPasswordStrength(input.password);

    // Encrypt password
    const encryptedPassword = await PasswordService.encrypt(input.password);

    // Create user instance
    const newUser = new UserModel({
      ...input,
      password: encryptedPassword,
    });

    // Validate
    await newUser.validate();

    return newUser;
  }
}
