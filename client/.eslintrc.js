module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks', '@emotion'],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    '@emotion/jsx-import': 'error',
    '@emotion/pkg-renaming': 'error',
  },
  ignorePatterns: [
    'src/serviceWorker.ts',
    'src/**/__tests__/**',
    'apollo.config.js',
    'src/generated/graphql.tsx',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
