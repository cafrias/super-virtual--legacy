import ProductModel from '../Product/Product';
import BrandModel from '../Brand/Brand';
import StockService from './StockService';
import { Units } from '../Units/Units';

describe('StockService', () => {
  describe('createStock', () => {
    const newBrand = new BrandModel({
      logo: 'http://logo.net',
      name: 'Ol Oiler',
    });
    const newProduct = new ProductModel({
      picture: 'http://logo.net',
      name: 'Oil',
      brand: newBrand,
    });

    it('when no movements, creates correctly', async () => {
      const newStock = await StockService.createStock({
        product: newProduct,
        units: Units.UNIT,
      });

      expect(newStock.product.name).toBe(newProduct.name);
    });
  });
});
