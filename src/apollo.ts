import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { dataSources } from "./datasources";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});
