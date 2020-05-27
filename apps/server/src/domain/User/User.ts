import * as mongoose from 'mongoose';
import validator from 'validator';

export interface User extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: `Email is invalid`,
      },
      set(value: string): string {
        return value.trim().toLowerCase();
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModelName = 'User';
const UserModel = mongoose.model<User>(UserModelName, UserSchema);

export default UserModel;
