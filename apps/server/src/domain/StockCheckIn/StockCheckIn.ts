import * as mongoose from 'mongoose';
import validator from 'validator';

import StockMovementModel, {
  StockMovement,
} from '../StockMovement/StockMovement';
import { StockCheckInReason } from './StockCheckInReason';

//
// Interface
//
export interface StockCheckIn extends StockMovement {
  reason: StockCheckInReason;
}

//
// Discriminator
//
export const StockCheckInDiscriminatorKey = 'check_in';

//
// Schema
//
const StockCheckInSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
      validate: {
        validator(value: string): boolean {
          return validator.isIn(value, Object.values(StockCheckInReason));
        },
        message: `Unknown reason`,
      },
    },
  },
  {
    discriminatorKey: StockCheckInDiscriminatorKey,
  }
);

//
// Model
//
export const StockCheckInModelName = 'StockCheckIn';
const StockCheckInModel = StockMovementModel.discriminator<StockCheckIn>(
  StockCheckInModelName,
  StockCheckInSchema
);

export default StockCheckInModel;
