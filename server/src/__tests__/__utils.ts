import express = require("express");
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { json } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { BaseContext } from "@apollo/server";

import {
  execute,
  GraphQLRequest,
  ApolloLink,
  Observable,
  FetchResult,
} from "apollo-link";
import { ApolloContext } from "../../src/types/context";
import { CardAPI, CategoryAPI } from "../../src/datasources";

import {
  createServer,
  ApolloServer,
  ServerConfig,
  DataSource,
  createTestingConnection,
} from "../../src";

const defaultContext = {};

export type Mockify<T> = {
  [P in keyof T]: T[P] extends (...args: unknown[]) => unknown
    ? jest.Mock<ReturnType<T[P]>, Parameters<T[P]>>
    : T[P];
};

export const mockContext: ApolloContext = {
  dataSources: {
    cardAPI: {} as CardAPI,
    categoryAPI: {} as CategoryAPI,
  },
  connection: undefined,
};

/**
 * Integration testing utils
 */
export const constructTestServer = async (
  connection: DataSource,
  { context = defaultContext } = {},
): Promise<ServerConfig> => {
  return createServer(connection);
};

/**
 * e2e Testing Utils
 */

interface TestInterface {
  link: ApolloLink;
  stop: () => void;
  graphql: ({}: GraphQLRequest) => Observable<FetchResult>;
}

export const startTestServer = async (
  server: ApolloServer<ApolloContext>,
  connection: DataSource,
): Promise<TestInterface> => {
  // Check if the server is already started
  const app = express();

  // Try to start the server, catch and ignore the error if it's already started
  try {
    await server.start();
  } catch (error) {
    // If the error is about the server already being started, we can ignore it
    if (!(error instanceof Error) || !error.message.includes("start()")) {
      throw error;
    }
    // Otherwise, server is already started, continue
  }

  // Create actual instances of the data sources
  const cardAPI = new CardAPI({ connection });
  const categoryAPI = new CategoryAPI({ connection });

  app.use(
    "/graphql",
    json(),
    expressMiddleware(server as unknown as ApolloServer<BaseContext>, {
      context: async () => ({
        dataSources: {
          cardAPI,
          categoryAPI,
        },
        connection,
      }),
    }),
  );

  const port = 6000;

  const httpServer = app.listen(port, () => {
    console.log(
      `🧠 brainstrike e2e test running on: http://localhost:${port}/graphql`,
    );
  });

  // NOTE: apparently fetch isn't properly typed to spec, so have to work around with a type cast here
  const link = new HttpLink({
    uri: `http://localhost:${port}/graphql`,
    fetch: fetch as unknown as WindowOrWorkerGlobalScope["fetch"],
  });

  const executeOperation = ({
    query,
    variables = {},
  }: GraphQLRequest): Observable<FetchResult> =>
    execute(link, { query, variables });

  return {
    link,
    stop: (): void => {
      httpServer.close();
      // Don't stop the Apollo server here as it might be reused
    },
    graphql: executeOperation,
  };
};

export { createTestingConnection, DataSource };

/**
 * Helper function to convert date strings to Date objects in test data
 */
export function convertStringDatesToDateObjects<T>(obj: T): T {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const result = { ...obj };

  // Process the object's own properties
  for (const key in result) {
    if (result.hasOwnProperty(key)) {
      const value = result[key];

      // If property is created or updated and value is a string, convert to Date
      if (
        (key === "created" || key === "updated") &&
        typeof value === "string"
      ) {
        (result as Record<string, unknown>)[key] = new Date(value);
      }
      // If property is an array, recursively process each item
      else if (Array.isArray(value)) {
        (result as Record<string, unknown>)[key] = value.map((item) =>
          convertStringDatesToDateObjects(item),
        );
      }
      // If property is an object (except for Date objects), recursively process
      else if (value && typeof value === "object" && !(value instanceof Date)) {
        (result as Record<string, unknown>)[key] =
          convertStringDatesToDateObjects(value);
      }
    }
  }

  return result;
}
