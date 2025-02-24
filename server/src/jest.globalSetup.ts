import { createTestingConnection } from "./index";
import { Card, Category, User } from "./entity";

module.exports = async (): Promise<void> => {
  try {
    const connection = await createTestingConnection();

    // Ensure all entities are properly registered in TypeORM v0.3
    connection.entityMetadatas.forEach((metadata) => {
      console.log(`Entity ${metadata.name} is registered`);
    });

    await connection.dropDatabase();
    console.log("dropped test db");
    await connection.runMigrations();
    console.log("run migrations on test db");
    await connection.close();
  } catch (error) {
    console.error("Error during test setup:", error);
    process.exit(1);
  }
};
