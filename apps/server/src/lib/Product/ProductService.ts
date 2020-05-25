import ProductModel, { Product } from './Product';
import CreateProductDTO from './dto/CreateProductDTO';

export default class ProductService {
  static async createProduct(input: CreateProductDTO): Promise<Product> {
    const newProduct = new ProductModel(input);
    await newProduct.validate();
    return newProduct;
  }
}
