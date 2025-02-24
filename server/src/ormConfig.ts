import { config as setupDotEnv } from "dotenv";
import { DataSourceOptions } from "typeorm";
import { Card, Category, User } from "./entity";

setupDotEnv(); // adds .env environment file support

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = "localhost",
  POSTGRES_PORT = 5432,
} = process.env; // environment variables

export const postgresCreds = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
};

export const schemaConfig = {
  entities: [Card, Category, User],
  migrations: ["build/migration/**/*.{js,ts}"],
  subscribers: ["build/subscriber/**/*.{js,ts}"],
  migrationsRun: false,
};

const config: DataSourceOptions = {
  name: "dbConnection",
  type: "postgres",
  database: "brainstrike",
  synchronize: false, // don't use in production
  ...postgresCreds,
  ...schemaConfig,
  logging: ["query", "error"],
};

export default config;
