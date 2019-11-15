module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**"
  ]
};
