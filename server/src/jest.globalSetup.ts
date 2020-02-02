import { createTestingConnection } from "./index";

module.exports = async (): Promise<void> => {
  const connection = await createTestingConnection();
  await connection.dropDatabase();
  console.log("dropped test db");
  await connection.runMigrations();
  console.log("run migrations on test db");
  await connection.close();
};
