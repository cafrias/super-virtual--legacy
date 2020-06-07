import shortid from 'shortid';

import UserService from '../User/UserService';
import EmployeeModel, { Employee } from './Employee';
import CreateUserDTO from '../User/dto/CreateUser.dto';

export default class CustomerService {
  static async createEmployee(input: CreateUserDTO): Promise<Employee> {
    const password = await UserService.getEncryptedPassword(input.password);
    const employeeID = shortid.generate();

    const newEmployee = new EmployeeModel({
      ...input,
      employeeID,
      password,
    });

    await newEmployee.validate();

    return newEmployee;
  }
}
