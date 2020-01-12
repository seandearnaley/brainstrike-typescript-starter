import express = require("express");
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import {
  execute,
  GraphQLRequest,
  ApolloLink,
  Observable,
  FetchResult
} from "apollo-link";
import { ApolloContext } from "../../src/types/context";

import {
  createServer,
  ApolloServer,
  ServerConfig,
  Connection,
  createDbConnection
} from "../../src";

const defaultContext = {};

export type Mockify<T> = {
  [P in keyof T]: T[P] extends Function ? jest.Mock<{}> : T[P];
};

export const mockRepos = {
  cards: {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  },
  categories: {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn()
  }
};

export const mockContext: Mockify<ApolloContext> = {
  dataSources: null,
  connection: null
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
    fetch: fetch as any // eslint-disable-line
  });

  const executeOperation = ({
    query,
    variables = {}
  }: GraphQLRequest): Observable<FetchResult> =>
    execute(link, { query, variables });

  return {
    link,
    stop: (): void => {
      httpServer.close();
    },
    graphql: executeOperation
  };
};

export { createDbConnection, Connection };
