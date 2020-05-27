import ProductGroupService from './ProductGroupService';
import CategoryService from '../Category/CategoryService';
import CreateProductGroupDTO from './dto/CreateProductGroupDTO';

describe('ProductGroupService', () => {
  describe('createProductGroup', () => {
    it('creates correctly', async () => {
      const input: CreateProductGroupDTO = {
        icon: 'http://cool.logo',
        name: 'My Product group',
      };

      const newProductGroup = await ProductGroupService.createProductGroup(
        input
      );

      expect(newProductGroup.name).toBe(input.name);
      expect(newProductGroup.icon).toBe(input.icon);
    });

    it('when adding as child, creates correctly', async () => {
      const category = await CategoryService.createCategory({
        icon: 'http://cate.ry',
        name: 'Cat 1',
      });

      const input: CreateProductGroupDTO = {
        icon: 'http://cool.logo',
        name: 'My Product group',
        parent: category,
      };

      const newProductGroup = await ProductGroupService.createProductGroup(
        input
      );

      expect(newProductGroup.parent).toBeDefined();
      expect(newProductGroup.parent.name).toBe('Cat 1');
      expect(category.children[0].name).toBe(input.name);
    });

    it('when icon invalid, fails', async () => {
      const input: CreateProductGroupDTO = {
        icon: 'http:cool.logo',
        name: 'My Product group',
      };

      await expect(
        ProductGroupService.createProductGroup(input)
      ).rejects.toThrow();
    });

    it('when name missing, fails', async () => {
      const input: CreateProductGroupDTO = {
        icon: 'http://cool.logo',
        name: '',
      };

      await expect(
        ProductGroupService.createProductGroup(input)
      ).rejects.toThrow();
    });
  });
});
