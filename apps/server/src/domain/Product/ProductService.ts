import ProductModel, { Product } from './Product';
import CreateProductDTO from './dto/CreateProductDTO';

export default class ProductService {
  static async createProduct(input: CreateProductDTO): Promise<Product> {
    const { measurementUnits, amount, creationReason, ...productInput } = input;

    const newProduct = new ProductModel(productInput);
    await newProduct.validate();
    return newProduct;
  }
}
