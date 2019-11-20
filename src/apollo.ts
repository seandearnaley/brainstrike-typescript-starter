import express = require("express");
import { Connection } from "typeorm";
import { Card } from "./entity/Card";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { CardAPI } from "./datasources/card";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloContext } from "./types/context";

export const setupApollo = (
  connection: Connection,
  expressApp: express.Application
): ApolloServer => {
  const repos = {
    cards: connection.getRepository(Card)
  };

  const dataSources = (): DataSources<ApolloContext> => ({
    cardAPI: new CardAPI({ repos })
  });

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
