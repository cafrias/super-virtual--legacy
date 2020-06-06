import 'reflect-metadata';
import dotenv from 'dotenv';
import { container } from 'tsyringe';
import DatabaseConnection from '../src/lib/DB/DatabaseConnection';

dotenv.config();

module.exports = async () => {
  console.log('------------------------- SETUP');

  const connection = container.resolve(DatabaseConnection);
  await connection.connect(process.env.DB_TEST_URL);

  console.log(connection.getConnection().connection.readyState);

  console.log('------------------------- SETUP');
};
