import * as mongoose from 'mongoose';
import validator from 'validator';
import { Brand, BrandModelName } from '../Brand/Brand';

//
// Interface
//
export interface Product extends mongoose.Document {
  picture: string;
  name: string;
  brand: Brand;
}

//
// Schema
//
// TODO: ensure uniqueness between name - brand
const ProductSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'URL is invalid',
    },
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BrandModelName,
  },
});

//
// Model
//
export const ProductModelName = 'Product';
const ProductModel = mongoose.model<Product>(ProductModelName, ProductSchema);

export default ProductModel;
