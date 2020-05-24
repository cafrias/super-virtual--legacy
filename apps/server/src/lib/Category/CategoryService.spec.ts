import CategoryService from './CategoryService';
import CreateCategoryDTO from './dto/CreateCategoryDTO';

describe('CategoryService', () => {
  describe('createCategory', () => {
    it('creates correctly', async () => {
      const input: CreateCategoryDTO = {
        icon: 'http://url.com/image_id',
        name: 'Nice category',
      };
      const newCategory = await CategoryService.createCategory(input);

      expect(newCategory.name).toBe(input.name);
      expect(newCategory.icon).toBe(input.icon);
    });

    it('when adding as child, creates correctly', async () => {
      const higherCategory = await CategoryService.createCategory({
        icon: 'http://url.com/valid',
        name: 'A category',
      });

      const input: CreateCategoryDTO = {
        icon: 'http://url.com/image_id',
        name: 'Nice category',
        parent: higherCategory,
      };
      const newCategory = await CategoryService.createCategory(input);

      expect(newCategory.parent).toBe(higherCategory);
      expect(higherCategory.children[0]).toBe(newCategory);
    });

    it('when URL invalid, fails', async () => {
      const input: CreateCategoryDTO = {
        icon: 'http:url.com/image_id',
        name: 'Nice category',
      };

      await expect(CategoryService.createCategory(input)).rejects.toThrow();
    });

    it('when name is empty, fails', async () => {
      const input: CreateCategoryDTO = {
        icon: 'http://url.com/image_id',
        name: '',
      };

      await expect(CategoryService.createCategory(input)).rejects.toThrow();
    });
  });
});
