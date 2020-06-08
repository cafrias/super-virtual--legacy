import * as mongoose from 'mongoose';
import type { Customer } from '../Customer/Customer';
import { CustomerModelName } from '../Customer/constants';
import { ShoppingCartModelName } from './constants';

//
// Interface
//
export interface ShoppingCart extends mongoose.Document {
  loadedAt?: Date;
  customer: Customer;
}

//
// Schema
//
const ShoppingCartSchema = new mongoose.Schema({
  loadedAt: {
    type: Date,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CustomerModelName,
    required: true,
  },
  // TODO: add `items` StockCheckOut
});

//
// Methods
//
// ShoppingCartSchema.method('addCheckout', function addCheckOut() {})

//
// Model
//
const ShoppingCartModel = mongoose.model<ShoppingCart>(
  ShoppingCartModelName,
  ShoppingCartSchema
);

export default ShoppingCartModel;
