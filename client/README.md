# BrainStrike Client

![Node Client Test CI](https://github.com/seandearnaley/brainstrike-typescript-starter/workflows/Node%20Client%20Test%20CI/badge.svg?event=push)

This React application is powered by [Vite](https://vitejs.dev/) and Apollo Client.

## Available Scripts

Run these commands from the `client/` directory. Alternatively, many of these can be run from the project root using `pnpm -F client <command>` (e.g., `pnpm -F client dev`). The main project `README.md` (in the root directory) lists common workspace commands like `pnpm dev:client` which streamline development.

### `pnpm dev`
Starts the Vite development server (via `vite`) and runs GraphQL code generation (via `graphql-codegen --watch`) concurrently. This is the recommended command for development.

### `pnpm build`
Builds the app for production.

### `pnpm preview`
Locally preview the production build.

### `pnpm lint`
Runs ESLint on the codebase.

### `pnpm typecheck`
Runs TypeScript type checking.

### `pnpm test`
Runs the test suite with Vitest.

### `pnpm generate`
Generates GraphQL types and hooks. Use `pnpm generate:dev` to watch for changes.

## Learn More

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)

Updated: October 26th, 2025
