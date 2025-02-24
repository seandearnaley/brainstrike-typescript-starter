import express = require("express");
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import {
  execute,
  GraphQLRequest,
  ApolloLink,
  Observable,
  FetchResult,
} from "apollo-link";
import { ApolloContext, APIInterface } from "../../src/types/context";
import { CardAPI, CategoryAPI } from "../../src/datasources";

import {
  createServer,
  ApolloServer,
  ServerConfig,
  Connection,
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
  connection: Connection,
  { context = defaultContext } = {}
): Promise<ServerConfig> => {
  return createServer(connection, context);
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
  server: ApolloServer
): Promise<TestInterface> => {
  const app = express();
  server.applyMiddleware({ app });
  const port = 6000;

  const httpServer = app.listen(port, () => {
    console.log(
      `🧠 brainstrike e2e test running on: http://localhost:${port}${server.graphqlPath}`
    );
  });

  // NOTE: apparently fetch isn't properly typed to spec, so have to work around with an "any" here
  const link = new HttpLink({
    uri: `http://localhost:${port}/graphql`,
    fetch: fetch as any, // eslint-disable-line
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
    },
    graphql: executeOperation,
  };
};

export { createTestingConnection, Connection };

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
        (result as any)[key] = new Date(value);
      }
      // If property is an array, recursively process each item
      else if (Array.isArray(value)) {
        (result as any)[key] = value.map((item) =>
          convertStringDatesToDateObjects(item)
        );
      }
      // If property is an object (except for Date objects), recursively process
      else if (value && typeof value === "object" && !(value instanceof Date)) {
        (result as any)[key] = convertStringDatesToDateObjects(value);
      }
    }
  }

  return result;
}
