import { MongoMemoryServer } from 'mongodb-memory-server';
import DatabaseConnection from '../src/lib/DB/DatabaseConnection';

export default function setupMemoryDB(): [
  DatabaseConnection,
  MongoMemoryServer
] {
  const connection = new DatabaseConnection();
  const mongoServer = new MongoMemoryServer();

  beforeAll(async () => {
    const uri = await mongoServer.getUri();
    return connection.connect(uri);
  });

  afterAll(async () => {
    await connection.disconnect();
    await mongoServer.stop();
  });

  return [connection, mongoServer];
}
