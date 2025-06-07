# Migration Fixes

This document outlines the fixes applied after the initial migration from Create React App (CRA) to Vite.

## Test Fixes

### 1. Jest Compatibility in Vitest

Added Jest compatibility to Vitest by updating `setupTests.ts`:

```typescript
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make vi available globally
// This allows tests to use vi directly or through the jest global
window.jest = window.jest || vi;

// Mock matchMedia for tests
window.matchMedia = /* ... */;
```

### 2. Updated Test Mocks

- Updated `src/components/__tests__/ListItemLink.test.tsx` to use Vitest's `vi.mock` instead of Jest's `jest.mock`
- Added proper mocks for MUI components in the ListItemLink test
- Updated `src/components/__tests__/CardForm.test.tsx` to use Vitest's `vi.mock`
- Updated `src/__mocks__/react-router-dom.tsx` to use Vitest's `vi.fn()` instead of Jest's `jest.fn()`

### 3. Fixed formik-mui Compatibility

- Updated formik-mui to the latest version
- Added the missing `tiny-warning` dependency required by formik-mui

## ESLint Fixes

### 1. Removed Unused ESLint Disable Directives

- Removed unused `eslint-disable-next-line @typescript-eslint/no-non-null-assertion` from `src/index.tsx` and `src/main.tsx`
- Removed unused `eslint-disable @typescript-eslint/no-explicit-any` from `src/test-utils.tsx`

### 2. Updated ESLint Configuration

- Updated `eslint.config.js` to include ignores from `.eslintignore`
- Fixed TypeScript types in `src/test-utils.tsx` to avoid using `any` types

## GraphQL Schema and Code Generation Fixes

### 1. Apollo CLI Compatibility with ES Modules

- Created `apollo.config.cjs` (CommonJS version of `apollo.config.js`) to fix ES module compatibility issues
- Updated the `apollo:schema:download` script to use the `.cjs` config file
- Added a new `schema:download` script that uses curl to directly fetch the GraphQL schema:

```bash
curl -X POST http://localhost:4000/graphql -H 'Content-Type: application/json' -d '{\"query\":\"query { __schema { ... } }\"' | jq '.data' > graphql.schema.json
```

### 2. GraphQL Code Generation Updates

- Updated `codegen.ts` to use individual plugins instead of the client preset:

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql.schema.json',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        apolloClientVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        withResultType: true,
        withMutationOptionsType: true,
        withMutationFn: true,
        addDocBlocks: true,
        gqlImport: '@apollo/client#gql',
      },
    },
  },
};

export default config;
```

- Added a GraphQL resolution in `package.json` to ensure only one version of GraphQL is used:

```json
"resolutions": {
  "@graphql-codegen/**/mem": "^6.0.1",
  "graphql": "^16.10.0"
}
```

- Removed the Prettier hook from codegen.ts to avoid ES module issues

## Final Verification

A complete end-to-end verification of the workflow confirms that all parts of the development process are now working correctly:

1. **Schema Download**: The `pnpm schema:download` command successfully downloads the GraphQL schema using the curl command.

2. **Code Generation**: The `pnpm generate` command successfully parses the configuration and generates the GraphQL code, including operations, types, and hooks.

3. **Tests**: All 18 tests across 10 test files are now passing. There are still some warnings related to:

   - React DOM warnings in the CardForm test about unrecognized props (`InputLabelProps`, `fullWidth`, `rowsMax`)
   - Apollo Client errors in the CardContainer tests, but these don't cause test failures

4. **Build**: The build process completes successfully, generating all required files in the `dist` directory.

5. **Development Server**: The development server starts correctly with `pnpm start`.

## Current Status

The migration from Create React App to Vite is now complete. All critical functionality is working:

- ✅ Application builds successfully
- ✅ All tests pass
- ✅ ESLint runs without errors
- ✅ GraphQL schema can be downloaded
- ✅ GraphQL code generation works correctly
- ✅ Development server runs correctly

## Remaining Issues

While all functionality is working, there are still some warnings and potential improvements that could be addressed in future updates:

1. **React DOM Warnings**: The CardForm test has warnings about unrecognized props being passed to DOM elements.

2. **Apollo Client Warnings**: There are warnings related to Apollo Client in the CardContainer tests.

3. **TypeScript Version Warning**: The current TypeScript version (5.8.2) is not officially supported by @typescript-eslint/typescript-estree.

4. **Formik-MUI Props**: The formik-mui components may need updates to handle props correctly to avoid React DOM warnings.

5. **Apollo Client Mocks**: The Apollo Client mocks could be improved to avoid warnings in tests.

None of these issues affect the functionality of the application or prevent tests from passing, but they could be addressed to improve code quality and eliminate warnings.

## Next Steps

1. Update the Apollo Client mocks to avoid warnings in tests.
2. Improve the formik-mui mock to avoid React DOM warnings.
3. Consider downgrading TypeScript or waiting for @typescript-eslint to support the latest TypeScript version.
4. Explore alternatives for schema download that are compatible with ES modules.
5. Address React DOM warnings by updating component props or mocks.

## Cleanup of Unused CRA Files

After completing the migration to Vite, the following files and directories are no longer needed and can be safely removed:

1. **CRA Configuration Directories**:

   - `config/` - Contains CRA-specific webpack and Jest configurations
   - `scripts/` - Contains CRA-specific build scripts

2. **Old Build Output**:

   - `build/` - The old CRA build output (replaced by Vite's `dist/` directory)

3. **Replaced Configuration Files**:

   - `.eslintrc.js` - Replaced by `eslint.config.js`
   - `latest.js` - Custom script not needed with Vite
   - `apollo.config.js` - Replaced by `apollo.config.cjs` for ES module compatibility

4. **Public Directory Considerations**:
   - The `public/index.html` file is no longer needed as it's been replaced by the root `index.html`
   - Other static assets from `public/` are now referenced directly from the root directory in Vite
   - You may keep the `public/` directory if there are still references to it in your code

A cleanup script (`cleanup-cra.sh`) has been provided to help remove these unused files.
