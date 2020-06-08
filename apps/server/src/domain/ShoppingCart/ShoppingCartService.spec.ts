import ShoppingCartService from './ShoppingCartService';
import CustomerModel from '../Customer/Customer';

describe('ShoppingCartService', () => {
  describe('createShoppingCart', () => {
    it('creates correctly', async () => {
      const customer = new CustomerModel({});
      const shoppingCart = await ShoppingCartService.createShoppingCart({
        customer,
      });

      expect(shoppingCart.customer.id).toBe(customer.id);
    });
  });
});
