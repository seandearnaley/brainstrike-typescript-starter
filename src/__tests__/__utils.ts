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
// import { CardAPI } from "../../src/datasources/card";

// module.exports.toPromise = toPromise;

// import {
//   dataSources,
//   context: defaultContext,
//   typeDefs,
//   resolvers,
//   ApolloServer,
//   LaunchAPI,
//   UserAPI,
//   repos,
// } from "../";

/**
 * Integration testing utils
 */
// export const constructTestServer = ({ context = {} } = {}): {
//   server: ApolloServer;
//   cardAPI: CardAPI;
// } => {
//   const cardAPI = new CardAPI({ repos });

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     dataSources: () => ({ cardAPI }),
//     context
//   });
//   return { server, cardAPI };
// };

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
  const port = 5000;
  const httpServer = app.listen(port);

  const link = new HttpLink({
    uri: `http://localhost:5000`,
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
