import { createTestingConnection } from "./src/index";

module.exports = async (): Promise<void> => {
  // code goes here
  const connection = await createTestingConnection();
  await connection.dropDatabase();
  console.log("dropped test db");
  await connection.synchronize(true);
  console.log("sync test db");
  await connection.runMigrations();
  console.log("run migrations on test db");
  await connection.close();
};
