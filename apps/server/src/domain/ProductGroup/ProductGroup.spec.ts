import setupMemoryDB from '../../../test/setupMemoryDB';
import ProductGroupService from './ProductGroupService';
import CategoryService from '../Category/CategoryService';
import CategoryModel from '../Category/Category';
import ProductGroupModel from './ProductGroup';

describe('ProductGroup', () => {
  describe('post save', () => {
    setupMemoryDB();

    it('saves parent', async () => {
      const cat1 = await CategoryService.createCategory({
        icon: 'http://category.com',
        name: 'Cat 1',
      });

      const g1 = await ProductGroupService.createProductGroup({
        icon: 'http://icon.icon',
        name: 'Group 1',
        parent: cat1,
      });
      await g1.save();

      const dbCat1 = await CategoryModel.findOne({ name: 'Cat 1' }).populate(
        'children'
      );
      expect(dbCat1).toBeDefined();
      expect(dbCat1.children).toHaveLength(1);

      expect(dbCat1.children[0].name).toBe('Group 1');

      const dbG1 = await ProductGroupModel.findOne({
        name: 'Group 1',
      }).populate('parent');
      expect(dbG1).toBeDefined();
      expect(dbG1.parent).toBeDefined();
      expect(dbG1.parent.name).toBe('Cat 1');
    });
  });
});
