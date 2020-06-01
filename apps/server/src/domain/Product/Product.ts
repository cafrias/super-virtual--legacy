import * as mongoose from 'mongoose';
import validator from 'validator';
import { Brand, BrandModelName } from '../Brand/Brand';
import { Stock, StockSchema } from '../Stock/Stock';

//
// Interface
//
export interface Product extends mongoose.Document {
  picture: string;
  name: string;
  brand: Brand;
  stock: Stock;
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
  stock: {
    type: StockSchema,
    required: true,
  },
});

//
// Indexes
//
ProductSchema.index({ brand: 1, name: 1 }, { unique: true });

//
// Model
//
export const ProductModelName = 'Product';
const ProductModel = mongoose.model<Product>(ProductModelName, ProductSchema);

export default ProductModel;
