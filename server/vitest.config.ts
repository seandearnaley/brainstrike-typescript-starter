import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/__tests__/**/*.ts"],
    globalSetup: "./src/vitest.globalSetup.ts",
    setupFiles: ["reflect-metadata"],
    exclude: [
      "**/node_modules/**",
      "**/build/**",
      "**/__utils.ts",
      "**/__testData.ts",
      "**/__queries.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/build/**",
        "**/.vscode/**",
        "**/src/generated/**",
        "**/src/migration/**",
        "**/src/temp/**",
        "**/temp/**",
        "**/*.config.ts",
        "**/*.js",
        "**/src/index.ts",
        "**/src/migrate.ts",
      ],
    },
  },
  plugins: [swc.vite()],
});
