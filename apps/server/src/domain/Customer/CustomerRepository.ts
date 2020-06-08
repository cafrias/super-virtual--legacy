import { injectable } from 'tsyringe';
import DatabaseConnection from '../../lib/DB/DatabaseConnection';
import { Customer } from './Customer';

@injectable()
export default class CustomerRepository {
  constructor(private db: DatabaseConnection) {}

  async save(customer: Customer): Promise<void> {
    return this.db.runTransaction(async function runInTransaction(session) {
      await customer.save({ session });
      await customer.shoppingCart.save({ session });
    });
  }
}
