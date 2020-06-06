import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';
import ProductModel, { Product } from '../Product/Product';
import StockModel, { Stock } from './Stock';
import { Units } from '../Units/Units';
import BrandModel, { Brand } from '../Brand/Brand';
import StockRepository from './StockRepository';
import StockMovementModel from '../StockMovement/StockMovement';
import StockCheckInModel, { StockCheckIn } from '../StockCheckIn/StockCheckIn';
import setupTestDB from '../../../test/setupTestDB';

describe('StockRepository', () => {
  const connection = setupTestDB();

  describe('saveStock', () => {
    //
    // Fixture
    //
    let brand: Brand;

    let product: Product;

    let stock: Stock;

    let newMovements: StockCheckIn[];

    let stockRepository: StockRepository;

    //
    // Setup
    //
    beforeEach(async () => {
      await StockModel.createCollection();
      await StockMovementModel.createCollection();

      brand = new BrandModel({
        name: 'My Brand',
        logo: 'http://logo.net',
      });

      product = new ProductModel({
        picture: 'http://picture.net',
        name: 'Marolito',
        brand,
      });

      stock = new StockModel({
        units: Units.UNIT,
        product,
        movements: [],
      });

      newMovements = [
        new StockCheckInModel({
          absoluteAmount: 5,
          reason: StockCheckInReason.STOCK_RENEWAL,
          stock,
        }),
        new StockCheckInModel({
          absoluteAmount: 2,
          reason: StockCheckInReason.STOCK_RENEWAL,
          stock,
        }),
      ];

      // Add movements to the stock
      stock.addMovements(newMovements);

      stockRepository = new StockRepository(connection);
    });

    //
    // Teardown
    //
    afterEach(async () => {
      await StockMovementModel.collection.drop();
      await StockModel.collection.drop();
    });

    //
    // Tests
    //
    it('saves correctly', async () => {
      // Execute SuT
      await stockRepository.saveStock(stock, newMovements);

      // Check stock saved in DB
      const dbStock = await StockModel.findById(stock.id).populate('movements');
      expect(dbStock).not.toBeNull();
      expect(dbStock.hasMovements(newMovements)).toBe(true);
      expect(dbStock.amount).toBe(7);

      // Check movements saved in DB
      const dbMov1 = await StockMovementModel.findById(
        newMovements[0].id
      ).populate('stock');
      expect(dbMov1).not.toBeNull();
      expect(dbMov1.stock.id).toBe(dbStock.id);

      const dbMov2 = await StockMovementModel.findById(
        newMovements[1].id
      ).populate('stock');
      expect(dbMov2).not.toBeNull();
      expect(dbMov2.stock.id).toBe(dbStock.id);
    });

    it('when fails, reverts all changes', async () => {
      // Simulate error on save
      stock.save = jest.fn(() => {
        throw new Error();
      });

      // Execute SuT
      await expect(
        stockRepository.saveStock(stock, newMovements)
      ).rejects.toThrow();

      // Expect save to have been called
      expect(stock.save).toHaveBeenCalled();

      // Check stock saved in DB
      const dbStock = await StockModel.findById(stock.id);
      expect(dbStock).toBeNull();

      // Check movements saved in DB
      const dbMov1 = await StockMovementModel.findById(newMovements[0].id);
      expect(dbMov1).toBeNull();

      const dbMov2 = await StockMovementModel.findById(newMovements[1].id);
      expect(dbMov2).toBeNull();
    });

    it('when new movement is not added to the stock, fails', async () => {
      // Remove movements from the stock
      stock.movements = [];

      // Execute SuT
      await expect(
        stockRepository.saveStock(stock, newMovements)
      ).rejects.toThrow();
    });
  });
});
