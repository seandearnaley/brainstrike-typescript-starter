import { config as setupDotEnv } from "dotenv";
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
  entities: ["build/entity/**/*.{js,ts}"],
  migrations: ["build/migration/**/*.{js,ts}"],
  subscribers: ["build/subscriber/**/*.{js,ts}"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default {
  name: "dbConnection",
  type: "postgres",
  database: "brainstrike",
  synchronize: false, // don't use in production
  ...postgresCreds,
  ...schemaConfig,
  logging: ["query", "error"],
};
