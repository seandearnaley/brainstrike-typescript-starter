# Migration from Create React App to Vite

This document outlines the steps taken to migrate the Brainstrike client from Create React App (CRA) to Vite.

## Changes Made

1. **Added Vite and related dependencies**

   ```bash
   yarn add -D vite @vitejs/plugin-react vite-plugin-svgr vitest jsdom
   ```

2. **Created Vite configuration file**

   - Created `vite.config.ts` with React plugin, SVG support, and proxy configuration
   - Added Vitest configuration for testing

3. **Updated TypeScript configuration**

   - Updated `tsconfig.json` to work with Vite
   - Created `tsconfig.node.json` for Node.js environment
   - Created `src/vite-env.d.ts` for Vite environment types

4. **Created new entry points**

   - Moved `public/index.html` to root directory and updated it for Vite
   - Created `src/main.tsx` based on the existing `src/index.tsx`

5. **Updated environment variables**

   - Created `.env` file with Vite environment variables
   - Updated code to use `import.meta.env` instead of `process.env`

6. **Updated ESLint configuration**

   - Created `eslint.config.js` for ESLint 9
   - Added `"type": "module"` to `package.json` to support ES modules

7. **Updated package.json scripts**

   ```json
   "scripts": {
     "start": "vite",
     "build": "tsc && vite build",
     "preview": "vite preview",
     "test": "vitest run",
     "test:watch": "vitest",
     "lint": "eslint './src/**/*.{ts,tsx}'",
     "lint:fix": "eslint './src/**/*.{ts,tsx}' --fix",
     "generate": "graphql-codegen",
     "generate:dev": "graphql-codegen --watch",
     "apollo:schema:download": "apollo schema:download --endpoint=http://localhost:4000/graphql graphql.schema.json",
     "dev": "concurrently \"yarn run start\" \"yarn run generate:dev\""
   }
   ```

8. **Removed CRA-specific dependencies**
   ```bash
   yarn remove react-scripts react-app-rewired rimraf
   ```

## Known Issues

1. **Test failures**

   - Some tests are failing due to MUI and Jest mocks
   - Need to update the formik-mui dependency to work with MUI v6

2. **ESLint warnings**
   - Some ESLint warnings about unused eslint-disable directives

## Next Steps

1. Fix the remaining test failures
2. Update the formik-mui dependency to work with MUI v6
3. Fix the ESLint warnings
4. Update the documentation
