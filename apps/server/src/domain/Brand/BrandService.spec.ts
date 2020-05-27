import BrandService from './BrandService';
import CreateBrandDTO from './dto/CreateBrandDTO';

describe('BrandService', () => {
  describe('createBrand', () => {
    it('creates correctly', async () => {
      const input: CreateBrandDTO = {
        logo: 'http://logo.net',
        name: 'Brando',
      };

      const newBrand = await BrandService.createBrand(input);

      expect(newBrand.logo).toBe(input.logo);
      expect(newBrand.name).toBe(input.name.toLowerCase());
    });

    it('when name is missing, fails', async () => {
      const input: CreateBrandDTO = {
        logo: 'http://logo.net',
        name: '',
      };

      await expect(BrandService.createBrand(input)).rejects.toThrow();
    });

    it('when logo is invalid, fails', async () => {
      const input: CreateBrandDTO = {
        logo: 'http:logo.net',
        name: 'Brando',
      };

      await expect(BrandService.createBrand(input)).rejects.toThrow();
    });
  });
});
