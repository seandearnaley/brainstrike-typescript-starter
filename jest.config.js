module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "!**/node_modules/**",
    "!**/build/**",
    "!./src/generated/**"
  ],
  testPathIgnorePatterns: ["/node_modules/", "/__utils"]
};
