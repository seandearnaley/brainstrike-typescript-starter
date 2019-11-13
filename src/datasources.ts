import { createConnection, Connection } from "typeorm";

import { CardAPI } from "./datasources/card";
// import UserAPI from "./datasources/user";

export const createDbConnection = async (): Promise<Connection> => {
  // Create DB connection
  const connection: Connection = await createConnection();

  // Run migrations in production
  // if (isProduction) await connection.runMigrations()

  return connection;
};

interface DataSources {
  cardAPI: CardAPI;
}

// set up any dataSources our resolvers need
export const dataSources = (): any => ({
  cardAPI: new CardAPI()
});
