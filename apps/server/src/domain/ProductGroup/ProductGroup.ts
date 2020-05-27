import * as mongoose from 'mongoose';
import GroupModel, { Group } from '../Group/Group';
import { Product, ProductModelName } from '../Product/Product';
import { Category, CategoryModelName } from '../Category/Category';

//
// Interface
//
export interface ProductGroup extends Group {
  children: Product[];
  parent?: Category;
}

//
// Discriminator
//
export const ProductGroupDiscriminatorKey = 'product_group';

//
// Schema
//
const ProductGroupSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CategoryModelName,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductModelName,
      },
    ],
  },
  {
    discriminatorKey: ProductGroupDiscriminatorKey,
  }
);

//
// Methods
//
// TODO: hoist to parent class
ProductGroupSchema.method('addChild', function addChild(
  this: ProductGroup,
  child: Product
): Product[] {
  this.children.push(child);
  return this.children;
});

//
// Hooks
//
// TODO: hoist to parent class
ProductGroupSchema.post('save', async function postSave(this: ProductGroup) {
  if (this.parent) {
    await this.parent.save();
  }
});

//
// Model
//
export const ProductGroupModelName = 'ProductGroup';
const ProductGroupModel = GroupModel.discriminator<ProductGroup>(
  ProductGroupModelName,
  ProductGroupSchema
);

export default ProductGroupModel;
