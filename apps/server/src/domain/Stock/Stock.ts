import * as mongoose from 'mongoose';
import validator from 'validator';

import type { StockMovement } from '../StockMovement/StockMovement';
import isNatural from '../../utils/validators/isNatural';
import { Units } from '../Units/Units';
import type { Product } from '../Product/Product';
import { StockModelName } from './constants';
import { ProductModelName } from '../Product/constants';
import { StockMovementModelName } from '../StockMovement/constants';

//
// Interface
//
/**
 * Represents the stock of a given product
 */
export interface Stock extends mongoose.Document {
  amount: number;
  movements: StockMovement[];
  units: Units;
  product: Product;

  addMovement(movement: StockMovement): Stock;
  removeMovement(movementId: string): Stock;
}

//
// Schema
//
export const StockSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator(value: number): boolean {
        return isNatural(value, true);
      },
      message: 'The amount must be a natural number',
    },
  },
  units: {
    type: String,
    required: true,
    validate: {
      validator(value: string): boolean {
        return validator.isIn(value, Object.values(Units));
      },
      message: 'Invalid or unsupported Measurement Unit',
    },
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductModelName,
  },
  movements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: StockMovementModelName,
    },
  ],
});

//
// Methods
//
StockSchema.method('addMovement', function addMovement(
  this: Stock,
  movement: StockMovement
): Stock {
  const foundMov = this.movements.find((mov) => {
    return mov.id === movement.id;
  });
  if (foundMov) {
    return this;
  }

  this.movements.push(movement);
  this.amount += movement.getAmount();
  return this;
});

StockSchema.method('removeMovement', function removeMovement(
  this: Stock,
  movementId: string
): Stock {
  this.movements = this.movements.filter((mov) => {
    if (mov.id === movementId) {
      this.amount -= mov.getAmount();
      return false;
    }

    return true;
  });

  return this;
});

//
// Model
//
const StockModel = mongoose.model<Stock>(StockModelName, StockSchema);

export default StockModel;
