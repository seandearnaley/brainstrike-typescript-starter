import express = require("express");
import { Connection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { dataSources } from "./datasources";

export const setupApollo = (
  connection: Connection,
  expressApp: express.Application
): ApolloServer => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: {
      connection
    }
  });

  apolloServer.applyMiddleware({ app: expressApp });

  return apolloServer;
};
