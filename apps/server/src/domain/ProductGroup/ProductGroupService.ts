import ProductGroupModel, { ProductGroup } from './ProductGroup';
import CreateProductGroupDTO from './dto/CreateProductGroupDTO';

export default class ProductGroupService {
  static async createProductGroup(
    input: CreateProductGroupDTO
  ): Promise<ProductGroup> {
    const newProductGroup = new ProductGroupModel(input);
    await newProductGroup.validate();

    if (input.parent) {
      input.parent.addChild(newProductGroup);
    }

    return newProductGroup;
  }
}
