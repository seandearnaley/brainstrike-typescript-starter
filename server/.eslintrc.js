module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier', // Uses eslint-config-prettier to disable ESLint rules that might conflict with prettier
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2020, // Updated to a more recent ECMAScript version
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      decorators: true, // Enable decorator support
    },
    project: './tsconfig.json', // Specify the TypeScript configuration file
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    // Disable no-unused-vars for TypeORM decorators and entity classes
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern:
          'Entity|PrimaryGeneratedColumn|Column|ManyToMany|Tree|TreeChildren|TreeParent|JoinTable|Card|Category|User',
      },
    ],
    // Additional rules that might be needed for ESLint 9 compatibility
    'prettier/prettier': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: './tsconfig.json',
      },
    },
    'import/ignore': ['node_modules'],
  },
};
