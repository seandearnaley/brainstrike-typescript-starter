import "reflect-metadata";
import express, { json } from "express";
import { config as setupDotEnv } from "dotenv";
import { DataSource, Repository, DataSourceOptions } from "typeorm";
import { Card, Category, User } from "./entity";
import { typeDefs, resolvers } from "./graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { CardAPI, CategoryAPI } from "./datasources";
import { ApolloContext } from "./types/context";
import cors from "cors";

// this is the config for the production db
import ormConfig, { postgresCreds, schemaConfig } from "./ormConfig";

setupDotEnv(); // adds .env environment file support

const {
  NODE_PORT = 4000,
  NODE_HOST = "localhost",
  NODE_ENV = "development",
} = process.env; // environment variables

// NOTE: using partial here to make it easier to mock repos in unit tests,
// only have to implement part of the repo interface
interface DataSourceRepos {
  cards?: Partial<Repository<Card>>;
  categories?: Partial<Repository<Category>>;
}

const app = express();

const createDbConnection = async (
  options: DataSourceOptions,
): Promise<DataSource> => {
  try {
    const dataSource = new DataSource(options);
    const connection = await dataSource.initialize();
    console.log(`TypeORM Connected to ${options.database}`);
    return connection;
  } catch (err) {
    console.error(
      "Problem with TypeORM connection, check Postgres docker-up or your pg_hba.conf/postgresql.conf files/ also firewall settings",
      err,
    );
    process.exit(1);
  }
};

const createTestingConnection = (): Promise<DataSource> => {
  // Use test_db in CI environment, brainstrike_test locally
  const testDatabase = process.env.DATABASE_URL
    ? "test_db"
    : "brainstrike_test";

  return createDbConnection({
    name: "testConnection",
    type: "postgres",
    database: testDatabase,
    synchronize: false,
    ...postgresCreds,
    ...schemaConfig,
    logging: ["error"],
    entities: [Card, Category, User],
  });
};

interface ServerConfig {
  apolloServer: ApolloServer<ApolloContext>;
  cardAPI: CardAPI;
  categoryAPI: CategoryAPI;
}

const createServer = async (connection: DataSource): Promise<ServerConfig> => {
  const cardAPI = new CardAPI({ connection });
  const categoryAPI = new CategoryAPI({ connection });

  // have to use this to get resolverValidationOptions into Apollo
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: "ignore" },
  });

  const apolloServer = new ApolloServer<ApolloContext>({
    schema,
  });

  await apolloServer.start();

  return { apolloServer, cardAPI, categoryAPI };
};

const start = async (): Promise<void> => {
  const connection = await createDbConnection(ormConfig as DataSourceOptions);
  await connection.runMigrations();
  console.log("TypeORM runMigrations() COMPLETE.");

  const { apolloServer, cardAPI, categoryAPI } = await createServer(connection);

  app.use(
    "/graphql",
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    json(),
    expressMiddleware(apolloServer, {
      context: async () => ({
        dataSources: {
          cardAPI,
          categoryAPI,
        },
        connection,
      }),
    }),
  );

  app.listen(NODE_PORT, () => {
    console.log(
      `🧠 brainstrike server running on: http://${NODE_HOST}:${NODE_PORT}/graphql`,
    );
  });
};

// Start our server if we're not in a test env. (vitest sets NODE_ENV=test)
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
  DataSource,
  ServerConfig,
};
