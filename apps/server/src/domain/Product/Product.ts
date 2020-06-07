import * as mongoose from 'mongoose';
import validator from 'validator';
import { Brand, BrandModelName } from '../Brand/Brand';
import type { Stock } from '../Stock/Stock';
import { ProductModelName } from './constants';
import { StockModelName } from '../Stock/constants';

//
// Interface
//
export interface Product extends mongoose.Document {
  picture: string;
  name: string;
  brand: Brand;
  stock?: Stock;
}

//
// Schema
//
const ProductSchema = new mongoose.Schema<Product>({
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
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: StockModelName,
  },
});

//
// Indexes
//
ProductSchema.index({ brand: 1, name: 1 }, { unique: true });

//
// Model
//
const ProductModel = mongoose.model<Product>(ProductModelName, ProductSchema);

export default ProductModel;
