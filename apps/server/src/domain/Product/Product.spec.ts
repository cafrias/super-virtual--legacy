import ProductService from './ProductService';
import BrandService from '../Brand/BrandService';
import { Units } from '../Units/Units';
import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';
import setupTestDB from '../../../test/setupTestDB';
import ProductModel from './Product';
import BrandModel from '../Brand/Brand';

describe('ProductModel', () => {
  setupTestDB();

  //
  // Teardown
  //
  afterEach(async () => {
    await BrandModel.collection.drop();
    await ProductModel.collection.drop();
  });

  it('enforce uniqueness on brand and name', async () => {
    const brand = await BrandService.createBrand({
      logo: 'http://logo.cool',
      name: 'Brando',
    });
    await brand.save();

    const productName = 'name';

    const p1 = await ProductService.createProduct({
      brand,
      name: productName,
      picture: 'http://logo.power',
      measurementUnits: Units.UNIT,
      amount: 1,
      creationReason: StockCheckInReason.STOCK_RENEWAL,
    });
    await p1.save();

    const p2 = await ProductService.createProduct({
      brand,
      name: productName,
      picture: 'http://different.picture',
      measurementUnits: Units.GRAM,
      amount: 1,
      creationReason: StockCheckInReason.STOCK_RENEWAL,
    });

    await expect(p2.save()).rejects.toThrow();
  });
});
