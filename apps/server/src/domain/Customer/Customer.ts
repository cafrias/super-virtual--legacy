import * as mongoose from 'mongoose';
import validator from 'validator';

import UserModel, { User } from '../User/User';
import type { ShoppingCart } from '../ShoppingCart/ShoppingCart';

import { CustomerModelName } from './constants';
import { ShoppingCartModelName } from '../ShoppingCart/constants';

//
// Interface
//
export interface Customer extends User {
  address: string;
  shoppingCart: ShoppingCart;
}

//
// Discriminator
//
export const CustomerDiscriminatorKey = 'customer';

//
// Schema
//
const CustomerSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      validate: {
        validator(value: string): boolean {
          return !validator.isEmpty(value);
        },
        message: 'Address when defined cannot be empty',
      },
    },
    shoppingCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ShoppingCartModelName,
      required: false,
    },
  },
  {
    discriminatorKey: CustomerDiscriminatorKey,
  }
);

//
// Model
//
const CustomerModel = UserModel.discriminator<Customer>(
  CustomerModelName,
  CustomerSchema
);

export default CustomerModel;
