import StockCheckInService from './StockCheckInService';
import StockModel from '../Stock/Stock';
import { StockCheckInReason } from './StockCheckInReason';

describe('StockCheckInService', () => {
  describe('createStockCheckIn', () => {
    it('should create correctly', async () => {
      const newStock = new StockModel();

      const newCheckIn = await StockCheckInService.createStockCheckIn({
        absoluteAmount: 5,
        reason: StockCheckInReason.STOCK_RENEWAL,
        stock: newStock,
      });

      expect(newCheckIn.stock).toBe(newStock);
      expect(newCheckIn.getAmount()).toBe(5);
      expect(newCheckIn.reason).toBe(StockCheckInReason.STOCK_RENEWAL);
    });

    it('when amount is invalid, should fail', async () => {
      const newStock = new StockModel();

      await expect(
        StockCheckInService.createStockCheckIn({
          absoluteAmount: -5,
          reason: StockCheckInReason.STOCK_RENEWAL,
          stock: newStock,
        })
      ).rejects.toThrow();
    });
  });
});
