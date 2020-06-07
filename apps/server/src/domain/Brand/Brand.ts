import * as mongoose from 'mongoose';
import validator from 'validator';

//
// Interface
//
export interface Brand extends mongoose.Document {
  name: string;
  logo: string;
}

//
// Schema
//
const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    set(value: string): string {
      return value.trim().toLowerCase();
    },
  },
  logo: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: 'URL is invalid',
    },
  },
});

//
// Model
//
export const BrandModelName = 'Brand';
const BrandModel = mongoose.model<Brand>(BrandModelName, BrandSchema);

export default BrandModel;
