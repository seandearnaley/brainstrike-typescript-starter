const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginPrettier = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Ignore patterns (migrated from .eslintignore)
  {
    ignores: [
      "src/generated/**",
      "src/__tests__/__utils.ts", // Jest configuration issues with require() imports
      "eslint.config.js", // This config file uses require() which is necessary for CommonJS
    ],
  },

  // Base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,

  // TypeScript files configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".ts"],
        },
      },
    },
    rules: {
      "import/no-unresolved": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "Entity|PrimaryGeneratedColumn|Column|ManyToMany|Tree|TreeChildren|TreeParent|JoinTable|Card|Category|User",
        },
      ],
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-empty-pattern": "warn",
      "no-prototype-builtins": "warn",
      "prettier/prettier": "error",
    },
  },
];
