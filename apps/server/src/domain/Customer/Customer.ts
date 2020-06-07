import * as mongoose from 'mongoose';
import validator from 'validator';

import UserModel, { User } from '../User/User';

//
// Interface
//
export interface Customer extends User {
  address: string;
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
  },
  {
    discriminatorKey: CustomerDiscriminatorKey,
  }
);

//
// Model
//
export const CustomerModelName = 'Customer';
const CustomerModel = UserModel.discriminator<Customer>(
  CustomerModelName,
  CustomerSchema
);

export default CustomerModel;
