import StockModel from './Stock';
import StockCheckInModel from '../StockCheckIn/StockCheckIn';
import { Units } from '../Units/Units';
import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';

describe('Stock Model', () => {
  describe('addMovement', () => {
    it('adds correctly', () => {
      const stock = new StockModel({
        units: Units.UNIT,
      });
      const movement = new StockCheckInModel({
        reason: StockCheckInReason.ORDER_CANCELLED,
        absoluteAmount: 5,
      });

      stock.addMovement(movement);

      expect(stock.movements[0]).toBe(movement);
      expect(stock.amount).toBe(5);
    });

    it('when already found, do not add', () => {
      const movement = new StockCheckInModel({
        reason: StockCheckInReason.ORDER_CANCELLED,
        absoluteAmount: 5,
      });
      const stock = new StockModel({
        units: Units.UNIT,
        movements: [movement],
        amount: 5,
      });

      stock.addMovement(movement);

      expect(stock.movements).toHaveLength(1);
      expect(stock.amount).toBe(5);
    });
  });

  describe('removeMovement', () => {
    it('removes correctly', () => {
      const movement = new StockCheckInModel({
        reason: StockCheckInReason.ORDER_CANCELLED,
        absoluteAmount: 5,
      });
      const stock = new StockModel({
        units: Units.UNIT,
        movements: [movement],
        amount: 5,
      });

      stock.removeMovement(movement.id);

      expect(stock.movements).toHaveLength(0);
      expect(stock.amount).toBe(0);
    });

    it('when not found, everything keeps the same', () => {
      const movement = new StockCheckInModel({
        reason: StockCheckInReason.ORDER_CANCELLED,
        absoluteAmount: 5,
      });
      const stock = new StockModel({
        units: Units.UNIT,
        movements: [movement],
        amount: 5,
      });

      stock.removeMovement('asd1');

      expect(stock.movements).toHaveLength(1);
      expect(stock.amount).toBe(5);
    });
  });
});
