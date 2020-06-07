import * as mongoose from 'mongoose';

import UserModel, { User } from '../User/User';

//
// Interface
//
export interface Employee extends User {
  employeeID: string;
}

//
// Discriminator
//
export const EmployeeDiscriminatorKey = 'employee';

//
// Schema
//
const EmployeeSchema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
      required: true,
    },
  },
  {
    discriminatorKey: EmployeeDiscriminatorKey,
  }
);

//
// Model
//
export const EmployeeModelName = 'Employee';
const EmployeeModel = UserModel.discriminator<Employee>(
  EmployeeModelName,
  EmployeeSchema
);

export default EmployeeModel;
