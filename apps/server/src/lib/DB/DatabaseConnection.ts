import { connect } from 'mongoose';
import { singleton } from 'tsyringe';

@singleton()
export default class DatabaseConnection {
  connection?: typeof import('mongoose');

  async connect(): Promise<void> {
    const url = process.env.DB_URL;
    if (!url) {
      throw new Error('DB_URL environment variable must be set');
    }

    try {
      const connection = await connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.connection = connection;
    } catch (err) {
      console.error(err);
      throw new Error('Connection could not be established');
    }
  }

  getConnection(): typeof import('mongoose') {
    if (!this.connection) {
      throw new Error('Connection has not been established');
    }
    return this.connection;
  }
}