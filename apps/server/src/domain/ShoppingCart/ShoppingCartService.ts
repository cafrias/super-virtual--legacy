import CreateShoppingCartDTO from './dto/CreateShoppingCartDTO';
import ShoppingCartModel, { ShoppingCart } from './ShoppingCart';

export default class ShoppingCartService {
  static async createShoppingCart(
    input: CreateShoppingCartDTO
  ): Promise<ShoppingCart> {
    const newCart = new ShoppingCartModel(input);
    await newCart.validate();
    return newCart;
  }
}
