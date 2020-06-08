import CustomerModel, { Customer } from './Customer';
import CreateCustomerDTO from './dto/CreateCustomerDTO';
import UserService from '../User/UserService';
import ShoppingCartService from '../ShoppingCart/ShoppingCartService';

export default class CustomerService {
  static async createCustomer(input: CreateCustomerDTO): Promise<Customer> {
    const password = await UserService.getEncryptedPassword(input.password);

    const newCustomer = new CustomerModel({
      ...input,
      password,
    });

    // Creates and adds shopping cart to customer
    const shoppingCart = await ShoppingCartService.createShoppingCart({
      customer: newCustomer,
    });

    newCustomer.shoppingCart = shoppingCart;

    await newCustomer.validate();

    return newCustomer;
  }
}
