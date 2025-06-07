# Contributor Guide for AI Agents and Developers

Welcome to the `brainstrike-typescript-starter` monorepo! This guide is designed to help both human developers and AI agents understand how to effectively contribute to this project.

## Codebase Overview

This is a pnpm workspace-powered monorepo using `pnpm` as the package manager. The structure is as follows:

- **`client/`**: The React + TypeScript client application (`brainstrike-client`).
  - Built with Vite, React 19+, Material UI, and Apollo Client 3.0
  - Uses GraphQL Code Generator for type-safe hooks and operations
  - Testing with Vitest and React Testing Library
- **`server/`**: The Node.js + TypeScript GraphQL API server (`brainstrike-server`).
  - Built with Apollo Server, Express, and TypeORM
  - PostgreSQL database with migration support
  - Comprehensive testing with Vitest
  - GraphQL Code Generator for resolvers and types

## Development Environment & Tips

- **Node.js**: Use Node.js version 18.19.1 or higher (as specified in package.json engines).
- **Package Manager**: This project uses `pnpm`. Install dependencies from the root of the monorepo:
  ```bash
  pnpm install
  ```
- **Running Development Servers/Tasks**: Use pnpm workspace commands to run scripts.
  - To run both client and server in development mode:
    ```bash
    pnpm dev
    ```
  - To run only the client:
    ```bash
    pnpm dev:client
    ```
  - To run only the server:
    ```bash
    pnpm dev:server
    ```
  - To build all packages:
    ```bash
    pnpm build
    ```
  - To build a specific package:
    ```bash
    pnpm build:client
    # or
    pnpm build:server
    ```
- **Adding Dependencies**:
  - To add a dependency to the client:
    ```bash
    pnpm add <package-name> --filter brainstrike-client
    ```
  - To add a dependency to the server:
    ```bash
    pnpm add <package-name> --filter brainstrike-server
    ```
  - To add a dev dependency to the root workspace:
    ```bash
    pnpm add -D <package-name> -w
    ```
- **Package Names**:
  - Client: `brainstrike-client`
  - Server: `brainstrike-server`
  - Root: `brainstrike-monorepo`

## Contribution and Style Guidelines

- **Primary Language**: TypeScript. Adhere to strict mode.
- **Client Framework**: React 19+ with functional components and hooks, Material UI for components.
- **Server Framework**: Apollo Server with Express, TypeORM for database access.
- **Database**: PostgreSQL with TypeORM migrations.
- **Styling**: Material UI components and Emotion for styling.
- **State Management**: Apollo Client for GraphQL state management.
- **Linting & Formatting**: ESLint and Prettier are used for linting and formatting.
  - Check for issues:
    ```bash
    pnpm lint
    ```
  - Auto-fix simple problems (recommended before committing):
    `bash
pnpm lint:fix
`
    These commands run across both client and server workspaces. Ensure your code is compliant before committing.
- **File & Directory Naming**:
  - **General**: kebab-case for files and directories (e.g., `my-feature/`, `utility-functions.ts`).
  - **React Components**: PascalCase for component files (e.g., `CardList.tsx`, `UserProfile.tsx`), and PascalCase for component exports.
  - **Custom Hooks**: camelCase starting with `use` (e.g., `useCardData.ts`, `useAuth.ts`).
- **Commit Messages**: Follow Conventional Commits specification.
  - **Format**: `<type>(<scope>): <subject>`
  - **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`, `build`, `revert`.
  - **Scopes**: `client`, `server`, `api`, `ui`, `config`, `deps`, `core`, `test`, `types`, `security`, `db`.

## Testing Instructions

- **Frameworks**:
  - Vitest: For unit and integration tests (`.test.ts`, `.integration.test.ts`).
  - React Testing Library: For React component testing.
- **Running Tests**:

  - **Unit & Integration Tests (Vitest)**:
    - Run all tests across both client and server:
      ```bash
      pnpm test
      ```
    - Run tests for a specific workspace:
      ```bash
      pnpm test:client
      # or
      pnpm test:server
      ```
    - Run tests in watch mode for a specific workspace:
      ```bash
      pnpm --filter brainstrike-client test:watch
      # or
      pnpm --filter brainstrike-server test:watch
      ```
    - From within a package's directory, you can run its specific test script:
      ```bash
      cd client
      pnpm test # Runs Vitest for the client
      ```
      ```bash
      cd server
      pnpm test # Runs Vitest for the server
      ```

- **Test Location**: Tests should be co-located with the source files they are testing (e.g., `my-component.tsx` and `my-component.test.tsx` in the same directory).
- **Type Checking**: Ensure there are no TypeScript errors.
  ```bash
  pnpm typecheck
  ```
  This command runs TypeScript type checking across both workspaces.
- **CI Pipeline**: The Continuous Integration setup can be found in `.github/workflows/`.
- **Requirement**: All tests (unit, integration) and type checks must pass. New code or changes must include corresponding tests. Fix any errors until the entire suite is green.

## Database Setup

- **Database**: PostgreSQL is required. Docker Compose is provided for local development.
- **Migrations**: Use TypeORM migrations for database schema changes.
  - Run migrations:
    ```bash
    pnpm --filter brainstrike-server migrate:up
    ```
  - Rollback migrations:
    ```bash
    pnpm --filter brainstrike-server migrate:down
    ```
- **Test Database**: A separate test database (`brainstrike_test`) is used for testing.

## GraphQL Development

- **Code Generation**: Both client and server use GraphQL Code Generator.
  - Generate types and hooks for client:
    ```bash
    pnpm --filter brainstrike-client generate
    ```
  - Generate types and resolvers for server:
    ```bash
    pnpm --filter brainstrike-server generate
    ```
  - Watch mode for development:
    ```bash
    pnpm --filter brainstrike-client generate:dev
    # or
    pnpm --filter brainstrike-server generate:dev
    ```

## Pull Request (PR) Instructions

- **Title Format**: Use the Conventional Commits format for PR titles:
  `<type>(<scope>): <Descriptive PR Title>`
  Example: `feat(client): Add user profile page` or `fix(server): Resolve database connection issue`
- **Checklist**:
  - **Crucially, the entire following command chain must pass without errors:**
    ```bash
    pnpm install && pnpm lint && pnpm build && pnpm typecheck && pnpm test
    ```
  - PR description clearly explains the changes and reasoning.
  - New functionality is covered by tests.
  - Database migrations are included if schema changes are made.
  - GraphQL schema changes are properly generated and tested.

## Codebase Migrations & Deprecations

- **Recent Migration**: The project has migrated from Yarn to pnpm workspaces for better performance and modern workspace features.
- When deprecating code, follow established deprecation patterns and update documentation accordingly.
- Ensure all dependencies are properly managed through the pnpm catalog system defined in `pnpm-workspace.yaml`.

## Validating Changes (Summary)

Before pushing code or opening a PR, ensure the **entire** following command chain completes successfully:

```bash
pnpm install && pnpm lint && pnpm build && pnpm typecheck && pnpm test
```

This comprehensive check includes:

1.  **Dependency Installation**: `pnpm install` (ensures all dependencies are correctly installed).
2.  **Linting**: `pnpm lint` (fix any reported issues with `pnpm lint:fix`).
3.  **Building**: `pnpm build` (ensures both client and server build successfully).
4.  **Type Checking**: `pnpm typecheck` (resolve all TypeScript errors).
5.  **Testing**: `pnpm test` (all unit and integration tests should pass).

Additional validation for database-related changes:

- Ensure migrations run successfully: `pnpm --filter brainstrike-server migrate:up`
- Verify GraphQL schema generation: `pnpm --filter brainstrike-server generate`

Only if this entire sequence is successful is the code considered ready for a Pull Request.

## Architecture Notes

The project follows a modern, layered architecture:

- **Client**: React 19+ with Apollo Client for GraphQL state management
- **Server**: Apollo Server with Express and TypeORM for database access
- **Database**: PostgreSQL with TypeORM migrations and entities
- **Testing**: Comprehensive testing with Vitest across both client and server
- **Type Safety**: Full TypeScript coverage with GraphQL Code Generator

By following these guidelines, we can maintain a high-quality, consistent, and efficient development workflow for the `brainstrike-typescript-starter` project.
