# BrainStrike Server

This project was bootstrapped with TypeScript, Apollo Server, and TypeORM.

## Available Scripts

Run these commands from the `server/` directory. Alternatively, many of these can be run from the project root using `pnpm -F server <command>` (e.g., `pnpm -F server dev`). The main project `README.md` (in the root directory) lists common workspace commands like `pnpm dev:server` which streamline development.

### `pnpm dev`

Starts the development server (using `nodemon` for auto-reloading via `pnpm start:dev`) and runs GraphQL code generation in watch mode (via `pnpm generate:dev`) concurrently. This is the recommended command for development.
Navigate to [http://localhost:4000/graphql](http://localhost:4000/graphql) to view the GraphQL playground.
The server will automatically reload if you make code changes.

### `pnpm start`

Builds the app (if not already built) and runs it in production mode using `node build/src/index.js`.
This command does not watch for changes and is intended for production-like environments.

### `pnpm test`

Runs the test suite with Vitest using `vitest run`.
For interactive watch mode, use `pnpm test:watch`.

### `pnpm build`

Builds the app for production to the `build` folder using `tsc`.
The output is typically minified and optimized for performance.

### `pnpm lint`

Runs ESLint on the codebase (via `eslint './src/**/*.{ts,tsx}' --fix`), attempting to fix issues automatically.

### `pnpm create-fake-content`

Runs the fake content generator script.

### `pnpm generate`

Runs GraphQL code generation.

### `pnpm generate:auto`

Runs a script (`generate-code.mjs`) for GraphQL code generation, typically used for specific or automated generation tasks beyond the watch mode.

### `pnpm migrate:up`

Runs database migrations up.

### `pnpm migrate:down`

Runs database migrations down.

Updated: October 26th, 2025
