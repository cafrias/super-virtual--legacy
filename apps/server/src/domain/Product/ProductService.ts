import ProductModel, { Product } from './Product';
import CreateProductDTO from './dto/CreateProductDTO';
import StockService from '../Stock/StockService';
import StockCheckInService from '../StockCheckIn/StockCheckInService';
import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';

export default class ProductService {
  static async createProduct(input: CreateProductDTO): Promise<Product> {
    const { measurementUnits, amount, creationReason, ...productInput } = input;

    const newProduct = new ProductModel(productInput);
    await newProduct.validate();

    const newStock = await StockService.createStock({
      movements: [],
      product: newProduct,
      units: measurementUnits,
    });

    await StockCheckInService.createStockCheckIn({
      absoluteAmount: amount,
      reason: StockCheckInReason.STOCK_RENEWAL,
      stock: newStock,
    });

    newProduct.stock = newStock;

    return newProduct;
  }
}
