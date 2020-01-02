module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_username",
  password: "your_password",
  database: "brainstrike",
  synchronize: true, // don't use in production
  logging: false,
  entities: ["build/entity/**/*.{js,ts}"],
  migrations: ["build/migration/**/*.{js,ts}"],
  subscribers: ["build/subscriber/**/*.{js,ts}"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};
