import * as mongoose from 'mongoose';
import type { Stock } from '../Stock/Stock';
import isNatural from '../../utils/validators/isNatural';
import SchemaVersioned from '../../interfaces/SchemaVersioned';
import Timestamped from '../../interfaces/Timestamped';
import { StockMovementModelName } from './constants';

//
// Interface
//
/**
 * Represents a movement in the stock, there are two types of movement:
 * - `StockCheckIn`: Represents any movement of stock that adds a given amount of product to the stock
 * - `StockCheckOut`: Represents any movement of stock that removes a given amount of product from the stock
 */
export interface StockMovement
  extends mongoose.Document,
    Timestamped,
    SchemaVersioned {
  absoluteAmount: number;
  stock: Stock;

  getAmount(): number;
}

//
// Schema
//
const CURRENT_SCHEMA_VERSION = 0;

const StockMovementSchema = new mongoose.Schema(
  {
    absoluteAmount: {
      type: Number,
      validate: {
        validator: isNatural,
        message: 'Amount must be a natural number',
      },
      required: true,
    },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock',
    },
    _schemaVersion: {
      type: Number,
      default: CURRENT_SCHEMA_VERSION,
    },
  },
  {
    timestamps: true,
  }
);

//
// Methods
//
StockMovementSchema.method('getAmount', function getAmount(
  this: StockMovement
) {
  return this.absoluteAmount;
});

//
// Model
//
const StockMovementModel = mongoose.model<StockMovement>(
  StockMovementModelName,
  StockMovementSchema
);

export default StockMovementModel;
