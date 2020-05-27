import CustomerModel, { Customer } from './Customer';
import CreateCustomerDTO from './dto/CreateCustomerDTO';
import UserService from '../User/UserService';

export default class CustomerService {
  static async createCustomer(input: CreateCustomerDTO): Promise<Customer> {
    const password = await UserService.getEncryptedPassword(input.password);

    const newCustomer = new CustomerModel({
      ...input,
      password,
    });

    await newCustomer.validate();

    return newCustomer;
  }
}
