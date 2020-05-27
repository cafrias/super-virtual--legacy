import CreateProductDTO from './dto/CreateProductDTO';
import BrandService from '../Brand/BrandService';
import ProductService from './ProductService';

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
      };

      const newProduct = await ProductService.createProduct(input);

      expect(newProduct.brand.name).toBe(brand.name);
      expect(newProduct.name).toBe(input.name);
      expect(newProduct.picture).toBe(input.picture);
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
      };

      await expect(ProductService.createProduct(input)).rejects.toThrow();
    });
  });
});
