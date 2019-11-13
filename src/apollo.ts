import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./gql";
import mocks from "./mocks";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  mocks
});
