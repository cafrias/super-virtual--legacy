import CreateStockDTO from './dto/CreateStockDTO';
import StockModel, { Stock } from './Stock';

export default class StockService {
  static async createStock(input: CreateStockDTO): Promise<Stock> {
    const newStock = new StockModel(input);
    await newStock.validate();
    return newStock;
  }
}
