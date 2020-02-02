import { ConnectionOptions } from "typeorm";
import ormConfig from "./ormConfig";
import { createDbConnection } from "./index";

const start = async (): Promise<void> => {
  try {
    const connection = await createDbConnection(ormConfig as ConnectionOptions);

    if (process.argv.length !== 3) return;

    const direction = process.argv[2];

    if (direction === "up") {
      console.log(`running migrations ${direction} - runMigrations`);
      await connection.runMigrations();
    } else if (direction === "down") {
      console.log(`running migrations ${direction} - undo last migration`);
      await connection.undoLastMigration();
    }

    await connection.close();
  } catch (err) {
    throw Error(err.message);
    process.exit(1);
  }
  process.exit(0);
};

start();
