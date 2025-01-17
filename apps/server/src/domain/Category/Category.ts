import * as mongoose from 'mongoose';
import GroupModel, { Group, GroupModelName } from '../Group/Group';

export const CategoryDiscriminatorKey = 'category';

export interface Category extends Group {
  children: Group[];
  parent?: Category;

  addChild(child: Group): Group[];
}

//
// Schema
//
const CategorySchema = new mongoose.Schema<Category>(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      // TODO: change for CategoryModelName
      ref: GroupModelName,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: GroupModelName,
      },
    ],
  },
  {
    discriminatorKey: CategoryDiscriminatorKey,
  }
);

//
// Methods
//
// TODO: hoist to parent class
CategorySchema.method('addChild', function addChild(
  this: Category,
  child: Group
): Group[] {
  this.children.push(child);
  return this.children;
});

//
// Hooks
//
// TODO: hoist to parent class
CategorySchema.post('save', async function postSave(this: Category) {
  if (this.parent) {
    await this.parent.save();
  }
});

//
// Model
//
export const CategoryModelName = 'Category';
const CategoryModel = GroupModel.discriminator<Category>(
  CategoryModelName,
  CategorySchema
);

export default CategoryModel;
