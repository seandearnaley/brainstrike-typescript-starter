# brainstrike-server

Update 8/16/2020: Special note about TypeORM, there is an issue preventing upgrading ^0.2.22, causes unit tests to fail, stick to that version for now: [https://github.com/typeorm/typeorm/issues/5676](https://github.com/typeorm/typeorm/issues/5676)

![Node Server Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Server%20Test%20CI/badge.svg?event=push)

Starter kit for Node Express Typescript Apollo GraphQL with TypeORM + GraphQL Code Gen + tests... Instructions to come.

- Don't forget to rename .env.example to .env and setup your own environment variables.
- Postgres is the only db supported right now, it should be easy to adapt to other databases yourself.
- Use Docker-Compose file for Postgres and PGAdmin with integration and E2E tests (brainstrike_test table is used for testing connections)

### `yarn start`

Runs the server.<br />
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view GraphQL Playground in browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn lint`

Will do lint tests with ESLint + Prettier

### `yarn create-fake-content`

Creates fake cards and categories for use with seed migration.

### `yarn generate`

Generates TypeScript resolvers, fragment matchers and other types with [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator).

### `yarn migrate:up`

Runs migration up

### `yarn migrate:down`

Runs migration down

## Troubleshooting

if attempting to run postgres via `docker-compose`, don't forget to copy `.env.example` to `.env`

if you encounter:

`/usr/local/bin/docker-entrypoint.sh: /docker-entrypoint-initdb.d/create-multiple-postgresql-databases.sh: /bin/bash: bad interpreter: Permission denied`

while running `docker-compose up`, it may be because Docker is copying permissions, therefore you need to make the script executable.

change to the pg-init-scripts folder and run

`chmod +x create-multiple-postgresql-databases.sh`

then run docker-compose up again

Updated: June 24th 2023
