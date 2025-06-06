import { createTestingConnection } from "./index";

export default async (): Promise<void> => {
  try {
    const connection = await createTestingConnection();

    connection.entityMetadatas.forEach((metadata) => {
      console.log(`Entity ${metadata.name} is registered`);
    });

    try {
      await connection.dropDatabase();
      console.log("dropped test db");
    } catch (error) {
      const dropError = error as Error;
      console.warn(
        "Warning: Could not drop database, it might not exist yet:",
        dropError.message,
      );
    }

    try {
      await connection.runMigrations();
      console.log("run migrations on test db");
    } catch (error) {
      const migrationError = error as Error;
      console.error("Error running migrations:", migrationError.message);
      if (!migrationError.message.includes("already exists")) {
        throw migrationError;
      }
      console.warn("Tables already exist, continuing with tests");
    }

    await connection.close();
  } catch (error) {
    console.error("Error during test setup:", error);
    process.exit(1);
  }
};
