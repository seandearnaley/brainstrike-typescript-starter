module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: false,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/__utils"]
};
