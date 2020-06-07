import CreateProductDTO from './dto/CreateProductDTO';
import BrandService from '../Brand/BrandService';
import ProductService from './ProductService';
import { Units } from '../Units/Units';
import { StockCheckInReason } from '../StockCheckIn/StockCheckInReason';

describe('ProductService', () => {
  describe('createProduct', () => {
    it('creates correctly', async () => {
      const brand = await BrandService.createBrand({
        logo: 'http://cool.logo',
        name: 'My alta brand',
      });

      const input: CreateProductDTO = {
        brand,
        name: 'Corn Oil',
        picture: 'http://corn.picture',
        measurementUnits: Units.UNIT,
        amount: 5,
        creationReason: StockCheckInReason.STOCK_RENEWAL,
      };

      const newProduct = await ProductService.createProduct(input);

      expect(newProduct.brand.name).toBe(brand.name);
      expect(newProduct.name).toBe(input.name);
      expect(newProduct.picture).toBe(input.picture);
      expect(newProduct.stock).toBeDefined();
      expect(newProduct.stock.amount).toBe(5);
      expect(newProduct.stock.movements).toHaveLength(1);
    });

    it('when amount is 0, should fail', async () => {
      const brand = await BrandService.createBrand({
        logo: 'http://cool.logo',
        name: 'My alta brand',
      });

      const input: CreateProductDTO = {
        brand,
        name: 'Corn Oil',
        picture: 'http://corn.picture',
        measurementUnits: Units.UNIT,
        amount: 0,
        creationReason: StockCheckInReason.STOCK_RENEWAL,
      };

      await expect(ProductService.createProduct(input)).rejects.toThrow();
    });

    it('when amount is negative, fails', async () => {
      const brand = await BrandService.createBrand({
        logo: 'http://cool.logo',
        name: 'My alta brand',
      });

      const input: CreateProductDTO = {
        brand,
        name: 'Corn Oil',
        picture: 'http://corn.picture',
        measurementUnits: Units.UNIT,
        amount: -5,
        creationReason: StockCheckInReason.STOCK_RENEWAL,
      };

      await expect(ProductService.createProduct(input)).rejects.toThrow();
    });

    it('when name is empty, fails', async () => {
      const brand = await BrandService.createBrand({
        logo: 'http://cool.logo',
        name: 'My alta brand',
      });

      const input: CreateProductDTO = {
        brand,
        name: '',
        picture: 'http://corn.picture',
        measurementUnits: Units.UNIT,
        amount: 1,
        creationReason: StockCheckInReason.STOCK_RENEWAL,
      };

      await expect(ProductService.createProduct(input)).rejects.toThrow();
    });

    it('when picture is invalid, fails', async () => {
      const brand = await BrandService.createBrand({
        logo: 'http://cool.logo',
        name: 'My alta brand',
      });

      const input: CreateProductDTO = {
        brand,
        name: 'My product',
        picture: 'http::invalid.picture',
        measurementUnits: Units.UNIT,
        amount: 1,
        creationReason: StockCheckInReason.STOCK_RENEWAL,
      };

      await expect(ProductService.createProduct(input)).rejects.toThrow();
    });
  });
});
