import { connect, ClientSession, ConnectionOptions } from 'mongoose';
import { singleton } from 'tsyringe';

@singleton()
export default class DatabaseConnection {
  connection?: typeof import('mongoose');

  async connect(
    url: string | undefined = process.env.DB_URL,
    options: ConnectionOptions = {}
  ): Promise<void> {
    if (!url) {
      if (!url) {
        throw new Error('DB_URL environment variable must be set');
      }
    }

    try {
      const connection = await connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        ...options,
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

  disconnect(): Promise<void> {
    const connection = this.getConnection();
    return connection.disconnect();
  }

  async runTransaction(
    callback: (session: ClientSession) => Promise<void>
  ): Promise<void> {
    const session = await this.getConnection().startSession();
    return session.withTransaction(callback.bind(null, session));
  }
}
