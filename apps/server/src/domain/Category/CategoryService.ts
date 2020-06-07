import CreateCategoryDTO from './dto/CreateCategoryDTO';
import CategoryModel, { Category } from './Category';

export default class CategoryService {
  static async createCategory(input: CreateCategoryDTO): Promise<Category> {
    const newCategory = new CategoryModel(input);
    await newCategory.validate();

    if (input.parent) {
      input.parent.addChild(newCategory);
    }

    return newCategory;
  }
}
