import CustomerModel, { Customer } from './Customer';
import CreateCustomerDTO from './dto/CreateCustomerDTO';
import PasswordService from '../../lib/Auth/PasswordService';

export default class CustomerService {
  static async createCustomer(input: CreateCustomerDTO): Promise<Customer> {
    // Check password strength
    PasswordService.checkPasswordStrength(input.password);

    // Encrypt password
    const encryptedPassword = await PasswordService.encrypt(input.password);

    const newCustomer = new CustomerModel({
      ...input,
      password: encryptedPassword,
    });

    await newCustomer.validate();

    return newCustomer;
  }
}
