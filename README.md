# brainstrike-typescript-starter

![Node Server Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Server%20Test%20CI/badge.svg?event=push)
![Node Client Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Client%20Test%20CI/badge.svg?event=push)

<img src="./brainstrike.svg" width="200" align="right">

Starter kit for Node.js + Typescript + React.js + Apollo GraphQL + TypeORM

## Features

- Typescript Node + React
- Apollo GraphQL (apollo-client 3.0)
- TypeORM w/ testing connections (Docker-Compose Postgres + GitHub Actions)
- GraphQL Code Generator
- Material UI
- Unit/Integration/E2E tests
- React client with Hooks
- Prettier + ESLint configuration

Detailed Installation + Instructions to come.

NOTE: VS Code settings for ESLint+Prettier (consequence of mono repo structure)

"eslint.workingDirectories": [ "./client", "./server" ]

## Prerequisites

Tested with Node 12+, Postgres 11+ required for database.  Docker-compose provided for Postgres.  Should be easy to adapt examples to other databases... may update database support in future versions.

## Folders

This is setup like a mono-repo with seperate folders for clients and server, each with their own package and config. You could set these up in their own repos, switch to each folder to start the respective packages.

- client = Material UI based React TypeScript (create-react-app non ejected), using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for hooks + TypeScript Types.  Apollo Client 3.0.

- server - Apollo Server using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for resolvers + types. Using TypeORM for database access, working examples of relay style cursor pagination, unit, integration and e2e tests.
