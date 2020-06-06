import StockModel from './Stock';
import StockCheckInModel from '../StockCheckIn/StockCheckIn';
import { Units } from '../Units/Units';
import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';
import StockMovementModel from '../StockMovement/StockMovement';

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

  describe('hasMovements', () => {
    it('when has all, returns true', () => {
      const movements = [new StockMovementModel(), new StockMovementModel()];
      const stock = new StockModel({
        units: Units.UNIT,
        movements,
        amount: 5,
      });

      const result = stock.hasMovements(movements);

      expect(result).toBe(true);
    });

    it('when at least one is missing, returns false', () => {
      const movements = [new StockMovementModel(), new StockMovementModel()];
      const stock = new StockModel({
        units: Units.UNIT,
        movements: [movements[1]],
        amount: 2,
      });

      const result = stock.hasMovements(movements);

      expect(result).toBe(false);
    });
  });

  describe('addMovements', () => {
    it('adds correctly', () => {
      const movement = [
        new StockCheckInModel({
          reason: StockCheckInReason.ORDER_CANCELLED,
          absoluteAmount: 5,
        }),
        new StockCheckInModel({
          reason: StockCheckInReason.ORDER_CANCELLED,
          absoluteAmount: 7,
        }),
      ];
      const stock = new StockModel({
        units: Units.UNIT,
        movements: [movement],
        amount: 5,
      });

      stock.addMovements(movement);

      expect(stock.movements).toHaveLength(2);
      expect(stock.amount).toBe(17);
    });
  });
});
