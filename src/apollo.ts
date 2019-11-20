import { Connection, Repository } from "typeorm";
import { Card } from "./entity/Card";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { CardAPI } from "./datasources/card";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { ApolloContext } from "./types/context";

// NOTE: using partial here to make it easier to mock repos in unit tests, only have to implement part of the repo interface
export interface RepoInterface {
  cards: Partial<Repository<Card>>;
}

export const setupDataSources = (
  connection: Connection
): (() => DataSources<ApolloContext>) => {
  const repos = {
    cards: connection.getRepository(Card)
  } as RepoInterface;

  return (): DataSources<ApolloContext> => ({
    cardAPI: new CardAPI({ repos })
  });
};

export const setupApollo = (
  dataSources: () => DataSources<ApolloContext>
): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });
};
