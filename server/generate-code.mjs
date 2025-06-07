#!/usr/bin/env node

/**
 * Script to automate the process of:
 * 1. Starting the server
 * 2. Running GraphQL code generation
 * 3. Stopping the server
 *
 * This eliminates the need to manually start and stop the server for code generation.
 */

import { spawn, execSync } from "child_process";

// Configuration
const SERVER_STARTUP_TIMEOUT = 10000; // 10 seconds to wait for server to start
const SERVER_PORT = 4000; // The port the GraphQL server runs on

console.log("🚀 Starting server and code generation process...");

// Function to check if server is running
const isServerRunning = () => {
  try {
    // Make a simple request to the GraphQL endpoint
    execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:${SERVER_PORT}/graphql`,
    );
    return true;
  } catch (error) {
    return false;
  }
};

// Start the server process
console.log("📡 Starting server...");
const serverProcess = spawn("pnpm", ["start:dev"], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: true,
});

serverProcess.stdout.on("data", (data) => {
  const output = data.toString();
  if (output.includes("Server ready at")) {
    console.log("✅ Server started successfully!");
  }
});

serverProcess.stderr.on("data", (data) => {
  console.error(`❌ Server error: ${data.toString()}`);
});

// Wait for server to start
const waitForServer = async () => {
  console.log(
    `⏳ Waiting for server to start (timeout: ${
      SERVER_STARTUP_TIMEOUT / 1000
    }s)...`,
  );

  const startTime = Date.now();

  while (Date.now() - startTime < SERVER_STARTUP_TIMEOUT) {
    if (isServerRunning()) {
      console.log("✅ Server is up and running!");
      return true;
    }

    // Wait a bit before checking again
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.error("❌ Server failed to start within the timeout period.");
  return false;
};

// Run code generation
const runCodeGeneration = () => {
  console.log("🔄 Running GraphQL code generation...");
  try {
    execSync("pnpm generate", { stdio: "inherit" });
    console.log("✅ Code generation completed successfully!");
    return true;
  } catch (error) {
    console.error("❌ Code generation failed:", error.message);
    return false;
  }
};

// Cleanup function to stop the server
const stopServer = () => {
  console.log("🛑 Stopping server...");

  // Kill the server process and all its children
  if (process.platform === "win32") {
    execSync(`taskkill /pid ${serverProcess.pid} /T /F`);
  } else {
    process.kill(-serverProcess.pid, "SIGINT");
  }

  console.log("✅ Server stopped.");
};

// Main execution flow
(async () => {
  try {
    // Start server and wait for it to be ready
    const serverStarted = await waitForServer();
    if (!serverStarted) {
      throw new Error("Server failed to start");
    }

    // Run code generation
    const generationSuccessful = runCodeGeneration();
    if (!generationSuccessful) {
      throw new Error("Code generation failed");
    }

    console.log("🎉 Process completed successfully!");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  } finally {
    // Always stop the server at the end
    stopServer();
    process.exit(0);
  }
})();
