# brainstrike-typescript-starter

![Node Server Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Server%20Test%20CI/badge.svg?event=push)
![Node Client Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Client%20Test%20CI/badge.svg?event=push)

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

NOTE: VS Code settings for ESLint+Prettier (consequence of mono repo structure)

"eslint.workingDirectories": [ "./client", "./server" ]

## Prerequisites

Tested with Node 12+, Postgres 11+ required for database. Docker-compose provided for Postgres. Should be easy to adapt examples to other databases... may update database support in future versions.

## Folders

This is setup like a mono-repo with seperate folders for clients and server, each with their own package and config. You could set these up in their own repos, switch to each folder to start the respective packages.

- client = Material UI based React TypeScript (create-react-app non ejected), using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for hooks + TypeScript Types. Apollo Client 3.0.

- server - Apollo Server using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator) for resolvers + types. Using TypeORM for database access, working examples of relay style cursor pagination, unit, integration and e2e tests.

# Recent Updates (as of January 2025)

**BREAKING CHANGE: Migrated from Yarn to pnpm workspaces**

- **Migration to pnpm v9.6.0**: Switched from Yarn to pnpm for better performance, disk space efficiency, and modern workspace features
- **Updated GitHub Actions**: All CI/CD workflows now use pnpm with proper workspace support and PostgreSQL services
- **Modern TypeScript 5.8.2**: Implemented catalog dependencies across workspaces for consistent versioning
- **Enhanced Scripts**: Added comprehensive development scripts including `dev`, `clean`, `typecheck`, and proper workspace filtering
- **Improved Configuration**: Added modern `.npmrc` with optimal pnpm settings for monorepo development
- **Removed Yarn Artifacts**: Cleaned up all Yarn-specific files (.yarnrc.yml, .yarn directories, lock files)

## Getting Started with pnpm

1. Install pnpm globally: `npm install -g pnpm` or use Corepack: `corepack enable pnpm`
2. Install dependencies: `pnpm install`
3. Start development: `pnpm dev` (runs both client and server)
4. Build all packages: `pnpm build`
5. Run tests: `pnpm test`

## Workspace Commands

- `pnpm dev:client` - Start only the React client
- `pnpm dev:server` - Start only the Node.js server
- `pnpm clean` - Clean all node_modules and build artifacts
- `pnpm typecheck` - Run TypeScript type checking across all packages
