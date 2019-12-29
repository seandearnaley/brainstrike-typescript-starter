module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "username",
  password: "username",
  database: "brainstrike",
  synchronize: true,
  logging: false,
  entities: ["build/entity/**/*.{js,ts}"],
  migrations: ["build/migration/**/*.ts"],
  subscribers: ["build/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "build/entity",
    migrationsDir: "build/migration",
    subscribersDir: "build/subscriber"
  }
};
