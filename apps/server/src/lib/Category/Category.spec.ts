import { MongoMemoryServer } from 'mongodb-memory-server';
import DatabaseConnection from '../DB/DatabaseConnection';
import CategoryService from './CategoryService';
import CategoryModel from './Category';

describe('CategoryModel', () => {
  const connection = new DatabaseConnection();
  const mongoServer = new MongoMemoryServer();

  beforeAll(async () => {
    const uri = await mongoServer.getUri();
    return connection.connect(uri);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongoServer.stop();
  });

  describe('post save', () => {
    it('saves parent', async () => {
      const category1 = await CategoryService.createCategory({
        icon: 'http://icon.com/',
        name: 'Cat 1',
      });
      const category2 = await CategoryService.createCategory({
        icon: 'http://icon.com',
        name: 'Cat 2',
        parent: category1,
      });

      await category2.save();

      const dbCat1 = await CategoryModel.findOne({ name: 'Cat 1' }).populate(
        'children'
      );
      expect(dbCat1).not.toBeNull();
      expect(dbCat1?.children[0].name).toBe('Cat 2');

      const dbCat2 = await CategoryModel.findOne({ name: 'Cat 2' }).populate(
        'parent'
      );
      expect(dbCat2).not.toBeNull();
      expect(dbCat2?.parent).toBeDefined();
      expect(dbCat2?.parent?.name).toBe('Cat 1');
    });
  });
});
