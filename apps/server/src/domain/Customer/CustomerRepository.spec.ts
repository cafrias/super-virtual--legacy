import setupTestDB from '../../../test/setupTestDB';
import CustomerService from './CustomerService';
import CustomerRepository from './CustomerRepository';
import CustomerModel, { Customer } from './Customer';
import ShoppingCartModel from '../ShoppingCart/ShoppingCart';

describe('CustomerRepository', () => {
  const connection = setupTestDB();
  const customerRepository = new CustomerRepository(connection);

  let customer: Customer;

  //
  // Fixture
  //
  beforeEach(async () => {
    customer = await CustomerService.createCustomer({
      email: 'customer@example.com',
      password: 'MySecureP4ssw0rd',
    });
  });

  //
  // Setup
  //
  beforeEach(async () => {
    await ShoppingCartModel.createCollection();
    await CustomerModel.createCollection();
  });

  //
  // Teardown
  //
  afterEach(async () => {
    await ShoppingCartModel.collection.drop();
    await CustomerModel.collection.drop();
  });

  describe('save', () => {
    it('saves correctly', async () => {
      await customerRepository.save(customer);

      // Check customer in DB
      const dbCustomer = await CustomerModel.findById(customer.id);
      expect(dbCustomer).not.toBeNull();
      expect(dbCustomer.email).toBe('customer@example.com');

      // Check Cart in DB
      const dbCart = await ShoppingCartModel.findById(
        customer.shoppingCart.id
      ).populate('customer');
      expect(dbCart).not.toBeNull();
      expect(dbCart.customer.email).toBe('customer@example.com');
    });

    it('when issue saving cart, reverts', async () => {
      // Simulate issue while saving cart
      customer.shoppingCart.save = jest.fn(() => {
        throw new Error();
      });

      await expect(customerRepository.save(customer)).rejects.toThrow();

      // Check customer in DB
      const dbCustomer = await CustomerModel.findById(customer.id);
      expect(dbCustomer).toBeNull();

      // Check Cart in DB
      const dbCart = await ShoppingCartModel.findById(
        customer.shoppingCart.id
      ).populate('customer');
      expect(dbCart).toBeNull();
    });
  });
});
