import CreateStockCheckInDTO from './dto/CreateStockCheckInDTO';
import StockCheckInModel, { StockCheckIn } from './StockCheckIn';

export default class StockCheckInService {
  /**
   * Creates a StockMovement of type StockCheckIn and adds it
   * to the stock, recalculating its current amount value
   * @param input
   */
  static async createStockCheckIn(
    input: CreateStockCheckInDTO
  ): Promise<StockCheckIn> {
    const newStockCheckIn = new StockCheckInModel(input);
    await newStockCheckIn.validate();
    input.stock.addMovement(newStockCheckIn);
    return newStockCheckIn;
  }
}
