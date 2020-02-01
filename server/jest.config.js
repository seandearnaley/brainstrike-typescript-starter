module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!./src/generated/**",
    "!./src/migration/**"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/build/",
    "/__utils",
    "/__testData"
  ],
  globalSetup: "./src/jest.globalSetup.ts"
};
