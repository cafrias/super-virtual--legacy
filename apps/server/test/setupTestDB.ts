import DatabaseConnection from '../src/lib/DB/DatabaseConnection';

export default function setupTestDB(): DatabaseConnection {
  const connection = new DatabaseConnection();

  beforeAll(() => {
    return connection.connect(process.env.DB_TEST_URL);
  });

  afterAll(() => {
    return connection.disconnect();
  });

  return connection;
}
