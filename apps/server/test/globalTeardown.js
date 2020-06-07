import { container } from 'tsyringe';
import DatabaseConnection from '../src/lib/DB/DatabaseConnection';

module.exports = async () => {
  console.log('------------------------ TEARDOWN');

  const connection = container.resolve(DatabaseConnection);
  await connection.disconnect();
};
