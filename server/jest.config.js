module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!./src/generated/**",
    "!./src/migration/**",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/__utils",
    "/__testData",
    "/__queries",
  ],
  globalSetup: "./src/jest.globalSetup.ts",
};
