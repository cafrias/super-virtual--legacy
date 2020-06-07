import { injectable } from 'tsyringe';
import { Stock } from './Stock';
import DatabaseConnection from '../../lib/DB/DatabaseConnection';
import { StockMovement } from '../StockMovement/StockMovement';

@injectable()
export default class StockRepository {
  constructor(private db: DatabaseConnection) {}

  async saveStock(stock: Stock, newMovements: StockMovement[]): Promise<void> {
    // Validate movements are in stock
    if (!stock.hasMovements(newMovements)) {
      throw new Error('Stock should have all new movement IDs');
    }

    // Saves movements atomically
    return this.db.runTransaction(async function inTransaction(session) {
      await Promise.all(
        newMovements.map((movement) => {
          return movement.save({ session });
        })
      );
      await stock.save({ session });
    });
  }
}
