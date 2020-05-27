import ProductService from './ProductService';
import BrandService from '../Brand/BrandService';
import setupMemoryDB from '../../../test/setupMemoryDB';

describe('ProductModel', () => {
  setupMemoryDB();

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
    });
    await p1.save();

    const p2 = await ProductService.createProduct({
      brand,
      name: productName,
      picture: 'http://different.picture',
    });

    await expect(p2.save()).rejects.toThrow();
  });
});
