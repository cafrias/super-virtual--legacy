import CreateStockCheckInDTO from './dto/CreateStockCheckInDTO';
import StockCheckInModel, { StockCheckIn } from './StockCheckIn';

export default class StockCheckInService {
  static async createStockCheckIn(
    input: CreateStockCheckInDTO
  ): Promise<StockCheckIn> {
    const newStockCheckIn = new StockCheckInModel(input);
    await newStockCheckIn.validate();
    return newStockCheckIn;
  }
}
