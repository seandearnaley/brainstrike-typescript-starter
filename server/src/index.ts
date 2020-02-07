import "reflect-metadata";
import express = require("express");
import { config as setupDotEnv } from "dotenv";
import {
  createConnection,
  Connection,
  Repository,
  ConnectionOptions
} from "typeorm";
import { Card, Category } from "./entity";
import { typeDefs, resolvers } from "./graphql";
import { ApolloServer } from "apollo-server-express";
import { CardAPI, CategoryAPI } from "./datasources";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloContext } from "./types/context";

import ormConfig, { postgresCreds, schemaConfig } from "./ormConfig";

setupDotEnv(); // adds .env environment file support

const {
  NODE_PORT = 4000,
  NODE_HOST = "localhost",
  NODE_ENV = "development"
} = process.env; // environment variables

// NOTE: using partial here to make it easier to mock repos in unit tests,
// only have to implement part of the repo interface
interface DataSourceRepos {
  cards?: Partial<Repository<Card>>;
  categories?: Partial<Repository<Category>>;
}

const defaultContext = {};
const app = express();

const createDbConnection = async (
  options: ConnectionOptions
): Promise<Connection> => {
  try {
    const connection: Connection = await createConnection(options);
    console.log(`TypeORM Connected to ${options.database}`);
    return connection;
  } catch (err) {
    console.log("Problem with TypeORM connection, check Postgres docker-up");
    throw err.message;
    process.exit(1);
  }
};

const createTestingConnection = (): Promise<Connection> =>
  createDbConnection({
    name: "testConnection",
    type: "postgres",
    database: "brainstrike_test",
    synchronize: false,
    ...postgresCreds,
    ...schemaConfig,
    logging: ["error"]
  });

interface ServerConfig {
  apolloServer: ApolloServer;
  cardAPI: CardAPI;
  categoryAPI: CategoryAPI;
}

const createServer = async (
  connection: Connection,
  context = defaultContext
): Promise<ServerConfig> => {
  const cardAPI = new CardAPI({ connection });
  const categoryAPI = new CategoryAPI({ connection });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources: (): DataSources<ApolloContext> => ({ cardAPI, categoryAPI })
  });

  return { apolloServer, cardAPI, categoryAPI };
};

const start = async (): Promise<void> => {
  const connection = await createDbConnection(ormConfig as ConnectionOptions);
  await connection.runMigrations();
  console.log("TypeORM runMigrations() COMPLETE.");

  const { apolloServer } = await createServer(connection);

  apolloServer.applyMiddleware({ app });

  app.listen(NODE_PORT, () => {
    console.log(
      `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}${apolloServer.graphqlPath}`
    );
  });
};

// Start our server if we're not in a test env. (JEST sets NODE_ENV=test)
// if we're in a test env, we'll manually start it in a test
if (NODE_ENV !== "test" && NODE_ENV !== "migration") start();

export {
  typeDefs,
  resolvers,
  ApolloServer,
  createServer,
  DataSourceRepos,
  createDbConnection,
  createTestingConnection,
  Connection,
  ServerConfig
};
