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

## Remaining Issues

### 1. Apollo Client Warnings

There are still some Apollo Client warnings in the tests:

```
An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#...
```

These warnings are related to the Apollo Client cache and don't affect the test results.

### 2. React DOM Warnings in CardForm Test

There are some React DOM warnings in the CardForm test related to props being passed to DOM elements:

```
React does not recognize the `InputLabelProps` prop on a DOM element.
React does not recognize the `fullWidth` prop on a DOM element.
Received `true` for a non-boolean attribute `multiline`.
React does not recognize the `rowsMax` prop on a DOM element.
```

These warnings are due to the simple mock we're using for the formik-mui TextField component. They don't affect the test results.

### 3. TypeScript Version Warning

There's a warning about the TypeScript version not being officially supported by @typescript-eslint/typescript-estree:

```
WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.
```

This is because we're using TypeScript 5.8.2, but @typescript-eslint/typescript-estree only supports up to TypeScript 5.7.x. This doesn't affect the linting results.

## Next Steps

1. Consider updating the Apollo Client mocks to fix the warnings
2. Improve the formik-mui mock to avoid React DOM warnings
3. Consider downgrading TypeScript or waiting for @typescript-eslint to support TypeScript 5.8.x
