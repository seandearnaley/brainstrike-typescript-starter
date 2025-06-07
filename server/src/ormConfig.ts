import { config as setupDotEnv } from "dotenv";
import { DataSourceOptions } from "typeorm";
import { Card, Category, User } from "./entity";

setupDotEnv(); // adds .env environment file support

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST = "localhost",
  POSTGRES_PORT = 5432,
  DATABASE_URL,
} = process.env; // environment variables

// Parse DATABASE_URL if individual env vars are not provided (e.g., in CI)
let postgresCreds: {
  host: string;
  port: number;
  username: string;
  password: string;
};

if (DATABASE_URL && (!POSTGRES_USER || !POSTGRES_PASSWORD)) {
  // Parse DATABASE_URL format: postgresql://username:password@host:port/database
  const url = new URL(DATABASE_URL);
  postgresCreds = {
    host: url.hostname,
    port: Number(url.port) || 5432,
    username: url.username,
    password: url.password,
  };
} else {
  postgresCreds = {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER || "",
    password: POSTGRES_PASSWORD || "",
  };
}

export { postgresCreds };

export const schemaConfig = {
  entities: [Card, Category, User],
  migrations: ["build/src/migration/**/*.{js,ts}"],
  subscribers: ["build/src/subscriber/**/*.{js,ts}"],
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
