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
import { ApolloServer } from "apollo-server-express";

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

  const link = new HttpLink({
    uri: `http://localhost:${port}/graphql`,
    fetch
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
