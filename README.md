# brainstrike-typescript-starter

![Node Server Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Server%20Test%20CI/badge.svg?event=push)
![Node Client Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Client%20Test%20CI/badge.svg?event=push)

<img src="./brainstrike.svg" width="200" align="right">

Starter kit for Node.js + Typescript + React.js + Apollo GraphQL + TypeORM

## Features

- Typescript Node + React
- Material UI
- Apollo GraphQL
- GraphQL Code Generator
- TypeORM w/ testing connections (Docker-Compose Postgres + GitHub Actions)
- Unit/Integration/E2E tests
- React client with Hooks
- Prettier + ESLint configuration

Detailed Installation + Instructions to come.

NOTE VS Code settings for ESLint+Prettier

"eslint.workingDirectories": [ "./client", "./server", "./apollo-client-2.6" ]

## Folders

This is setup like a mono-repo with seperate folders for clients and server, each with their own package and config. You could set these up in their own repos, switch to each folder to start the respective packages.

Clients under construction

- client = Material UI based React TypeScript (create-react-app non ejected), using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for hooks + TypeScript Types.
- apollo-client-2.6 = Bare bones React TypeScript (create-react-app non ejected) using [Apollo Tooling](https://github.com/apollographql/apollo-tooling) for TypeScript Types.  Using emotion for CSS (note you can't using CSS Modules with TSX without ejecting create-react-app)
- server - Apollo Server using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for resolvers + types. Using TypeORM for database access, working examples of relay style cursor pagination, unit, integration and e2e tests.
